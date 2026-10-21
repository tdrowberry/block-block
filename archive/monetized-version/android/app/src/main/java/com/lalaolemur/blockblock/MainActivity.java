package com.lalaolemur.blockblock;

import androidx.activity.ComponentActivity;
import androidx.activity.OnBackPressedCallback;
import android.os.Bundle;
import android.app.AlertDialog;
import android.content.SharedPreferences;
import android.content.Intent;
import android.net.Uri;
import android.webkit.*;
import android.graphics.Color;
import android.view.View;
import android.view.WindowInsets;
import androidx.webkit.WebViewAssetLoader;
import com.android.billingclient.api.*;
import com.google.android.gms.ads.*;
import com.google.android.gms.ads.rewarded.*;
import com.google.android.gms.ads.interstitial.*;
import com.google.android.ump.*;
import org.json.*;
import java.util.*;
import java.security.*;
import java.security.spec.X509EncodedKeySpec;

public class MainActivity extends ComponentActivity {
 private WebView web;
 private SharedPreferences wallet;
 private BillingClient billing;
 private final Map<String,ProductDetails> products=new HashMap<>();
 private ConsentInformation consent;
 private boolean adsInitialized=false,adBusy=false;
 private InterstitialAd interstitial;
 private boolean interstitialLoading=false;
 private int adPrivacyGeneration=0;
 private long interstitialLoadedAt=0,lastFullScreenAt=0;
 private String purchaseRequest=null;
 private String purchaseProduct=null;
 private boolean audienceReady=false;
 private static final String ORIGIN="https://appassets.androidplatform.net";
 @Override public void onCreate(Bundle state){
  super.onCreate(state);
  getOnBackPressedDispatcher().addCallback(this,new OnBackPressedCallback(true){@Override public void handleOnBackPressed(){handleBack();}});
  wallet=getSharedPreferences("tip-wallet",MODE_PRIVATE);
  web=new WebView(this);web.setBackgroundColor(Color.rgb(19,37,30));setContentView(web);
  web.setOnApplyWindowInsetsListener((v,insets)->{
   if(android.os.Build.VERSION.SDK_INT>=30){android.graphics.Insets bars=insets.getInsets(WindowInsets.Type.systemBars()|WindowInsets.Type.displayCutout());v.setPadding(bars.left,bars.top,bars.right,bars.bottom);}
   else v.setPadding(insets.getSystemWindowInsetLeft(),insets.getSystemWindowInsetTop(),insets.getSystemWindowInsetRight(),insets.getSystemWindowInsetBottom());return insets;
  });
  web.getSettings().setJavaScriptEnabled(true);web.getSettings().setDomStorageEnabled(true);
  web.getSettings().setAllowFileAccess(false);web.getSettings().setAllowContentAccess(false);
  web.getSettings().setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
  WebView.setWebContentsDebuggingEnabled(BuildConfig.DEBUG);
  WebViewAssetLoader loader=new WebViewAssetLoader.Builder().addPathHandler("/assets/",new WebViewAssetLoader.AssetsPathHandler(this)).build();
  web.setWebViewClient(new WebViewClient(){
   @Override public WebResourceResponse shouldInterceptRequest(WebView view,WebResourceRequest request){return loader.shouldInterceptRequest(request.getUrl());}
   @Override public boolean shouldOverrideUrlLoading(WebView view,WebResourceRequest request){
    Uri uri=request.getUrl();if("https".equals(uri.getScheme())&&"appassets.androidplatform.net".equals(uri.getHost())&&uri.getPath().startsWith("/assets/game/"))return false;
    if(request.hasGesture()&&("https".equals(uri.getScheme())||"mailto".equals(uri.getScheme())))try{startActivity(new Intent(Intent.ACTION_VIEW,uri));}catch(Exception ignored){}
    return true;
   }
  });
  web.addJavascriptInterface(new Bridge(),"BlockBlockNative");
  consent=UserMessagingPlatform.getConsentInformation(this);
  // Apply child protections to every player before any ad SDK initialization.
  MobileAds.setRequestConfiguration(MobileAds.getRequestConfiguration().toBuilder()
   .setAgeRestrictedTreatment(AgeRestrictedTreatment.CHILD)
   .setTagForChildDirectedTreatment(RequestConfiguration.TAG_FOR_CHILD_DIRECTED_TREATMENT_TRUE)
   .setMaxAdContentRating(RequestConfiguration.MAX_AD_CONTENT_RATING_G).build());
  web.loadUrl(ORIGIN+"/assets/game/index.html");
  String ageBand=wallet.getString("ageBand","");
  if(Arrays.asList("under13","13to17","18plus").contains(ageBand))initServices();else showAgeScreen();
 }
 private void showAgeScreen(){
  final int[] selected={-1};
  String[] values={"under13","13to17","18plus"};
  AlertDialog dialog=new AlertDialog.Builder(this).setTitle("Choose your age range")
   .setSingleChoiceItems(new String[]{"Under 13","13–17","18 or older"},-1,(d,which)->{selected[0]=which;((AlertDialog)d).getButton(AlertDialog.BUTTON_POSITIVE).setEnabled(true);})
   .setPositiveButton("Continue",null).setCancelable(false).create();
  dialog.setOnShowListener(d->{
   dialog.getButton(AlertDialog.BUTTON_POSITIVE).setEnabled(false);
   dialog.getButton(AlertDialog.BUTTON_POSITIVE).setOnClickListener(v->{
    if(selected[0]<0)return;
    if(!wallet.edit().putString("ageBand",values[selected[0]]).commit()){dialog.setTitle("Could not save. Please try again.");return;}
    dialog.dismiss();if(!audienceReady)initServices();
   });
  });
  dialog.show();
 }
 private void initServices(){
  audienceReady=true;
  initBilling();
  consent.requestConsentInfoUpdate(this,new ConsentRequestParameters.Builder().setTagForUnderAgeOfConsent(true).build(),()->UserMessagingPlatform.loadAndShowConsentFormIfRequired(this,error->initAds()),error->initAds());
 }
 private void initAds(){
  if(!audienceReady||!consent.canRequestAds()){interstitial=null;return;}
  if(!adsInitialized){adsInitialized=true;MobileAds.initialize(this,status->runOnUiThread(this::preloadInterstitial));}
  else preloadInterstitial();
 }
 private void preloadInterstitial(){
  if(!adsInitialized||!consent.canRequestAds()||adBusy||interstitialLoading||interstitial!=null||isFinishing())return;
  interstitialLoading=true;
  final int generation=adPrivacyGeneration;
  InterstitialAd.load(this,BuildConfig.INTERSTITIAL_ID,new AdRequest.Builder().build(),new InterstitialAdLoadCallback(){
   @Override public void onAdLoaded(InterstitialAd ad){if(generation!=adPrivacyGeneration)return;interstitialLoading=false;if(consent.canRequestAds()){interstitial=ad;interstitialLoadedAt=android.os.SystemClock.elapsedRealtime();}}
   @Override public void onAdFailedToLoad(LoadAdError error){if(generation==adPrivacyGeneration)interstitialLoading=false;}
  });
 }
 // Called only after a newly completed puzzle. Replays never increment this counter.
 private void levelComplete(String id){
  int count=wallet.getInt("newCompletions",0)+1;
  if(!wallet.edit().putInt("newCompletions",count).commit()){reply(id,object("shown",false));return;}
  long now=android.os.SystemClock.elapsedRealtime();
  if(interstitial!=null&&now-interstitialLoadedAt>3500000)interstitial=null;
  if(!AdCadence.eligible(count,now,lastFullScreenAt)||adBusy||interstitial==null||!consent.canRequestAds()||!getLifecycle().getCurrentState().isAtLeast(androidx.lifecycle.Lifecycle.State.RESUMED)){
   reply(id,object("shown",false));preloadInterstitial();return;
  }
  InterstitialAd ad=interstitial;interstitial=null;adBusy=true;
  ad.setFullScreenContentCallback(new FullScreenContentCallback(){
   @Override public void onAdDismissedFullScreenContent(){adBusy=false;lastFullScreenAt=android.os.SystemClock.elapsedRealtime();reply(id,object("shown",true));preloadInterstitial();}
   @Override public void onAdFailedToShowFullScreenContent(AdError error){adBusy=false;reply(id,object("shown",false));preloadInterstitial();}
  });
  ad.show(this);
 }
 private int credits(){return wallet.getInt("credits",0);}
 private JSONObject object(Object... pairs){JSONObject o=new JSONObject();try{for(int i=0;i<pairs.length;i+=2)o.put((String)pairs[i],pairs[i+1]);}catch(JSONException ignored){}return o;}
 private void reply(String id,JSONObject result){
  try{result.put("id",id);}catch(JSONException ignored){}
  runOnUiThread(()->{if(!isFinishing())web.evaluateJavascript("window.dispatchEvent(new CustomEvent('block-block-store',{detail:"+result+"}));",null);});
 }
 private void error(String id,String message){reply(id,object("error",message));}
 private JSONArray packDetails(){
  JSONArray packs=new JSONArray();
  for(String productId:TipCatalog.IDS){
   ProductDetails product=products.get(productId);
   if(product==null||product.getOneTimePurchaseOfferDetails()==null)continue;
   ProductDetails.OneTimePurchaseOfferDetails offer=product.getOneTimePurchaseOfferDetails();
   packs.put(object("id",productId,"count",TipCatalog.count(productId),"price",offer.getFormattedPrice(),"priceMicros",offer.getPriceAmountMicros(),"currency",offer.getPriceCurrencyCode()));
  }
  return packs;
 }
 private class Bridge {
  @JavascriptInterface public void request(String raw){
   runOnUiThread(()->{
    String id="";
    try{
     JSONObject request=new JSONObject(raw);id=request.getString("id");String action=request.getString("action");
     if(web.getUrl()==null||!web.getUrl().startsWith(ORIGIN+"/assets/game/")){error(id,"Unavailable page.");return;}
     switch(action){
      case "status":reply(id,object("credits",credits(),"packs",packDetails(),"ads",adsInitialized&&consent.canRequestAds(),"testAds",BuildConfig.DEBUG));break;
      case "refreshCatalog":products.clear();queryProduct();reply(id,object("message","Checking Google Play prices…"));break;
      case "spend":
       if(credits()<1){error(id,"No Tips available. Watch an ad or buy a pack first.");break;}
       if(!wallet.edit().putInt("credits",credits()-1).commit()){error(id,"Could not save your balance. Please try again.");break;}
       reply(id,object("credits",credits(),"spent",true));break;
      case "ad":showRewarded(id);break;
      case "levelComplete":levelComplete(id);break;
      case "buy":buy(id,request.optString("productId",""));break;
      case "privacy":
       final String privacyId=id;
       if(adBusy){error(id,"Finish the current ad before changing privacy choices.");break;}
       if(consent.getPrivacyOptionsRequirementStatus()!=ConsentInformation.PrivacyOptionsRequirementStatus.REQUIRED){reply(id,object("message","All players receive child-directed ads without personalized targeting. No additional consent form is currently required. Read the privacy policy for details."));break;}
       adBusy=true;adPrivacyGeneration++;interstitial=null;interstitialLoading=false;
       UserMessagingPlatform.showPrivacyOptionsForm(MainActivity.this,e->{adBusy=false;initAds();if(e!=null)error(privacyId,"Privacy choices are temporarily unavailable.");else reply(privacyId,object("message","Privacy choices saved."));});break;
      default:error(id,"Unknown store action.");
     }
    }catch(Exception e){error(id,"The store is temporarily unavailable. Please try again.");}
   });
  }
 }
 private void showRewarded(String id){
  if(adBusy){error(id,"An ad is already in progress.");return;}
  if(!adsInitialized||!consent.canRequestAds()){error(id,"Ads are not available yet. Try again later.");return;}
  adBusy=true;
  RewardedAd.load(this,BuildConfig.REWARDED_ID,new AdRequest.Builder().build(),new RewardedAdLoadCallback(){
   @Override public void onAdFailedToLoad(LoadAdError e){adBusy=false;error(id,"No ad is available right now. No Tip was spent.");}
   @Override public void onAdLoaded(RewardedAd ad){
    if(!consent.canRequestAds()||!getLifecycle().getCurrentState().isAtLeast(androidx.lifecycle.Lifecycle.State.RESUMED)){adBusy=false;error(id,"Return to the game and try again.");return;}
    final boolean[] earned={false},saved={false};
    ad.setFullScreenContentCallback(new FullScreenContentCallback(){
     @Override public void onAdDismissedFullScreenContent(){adBusy=false;lastFullScreenAt=android.os.SystemClock.elapsedRealtime();if(earned[0]&&!saved[0])error(id,"Your reward could not be saved. Please check device storage.");else reply(id,object("credits",credits(),"message",earned[0]?"You earned 1 Tip. Tap Use 1 Tip to reveal the trail.":"Ad closed before a reward was earned."));}
     @Override public void onAdFailedToShowFullScreenContent(AdError e){adBusy=false;error(id,"The ad could not be shown. No Tip was spent.");}
    });
    ad.show(MainActivity.this,reward->{if(!earned[0]){earned[0]=true;saved[0]=wallet.edit().putInt("credits",credits()+1).commit();}});
   }
  });
 }
 private void initBilling(){
  billing=BillingClient.newBuilder(this).enablePendingPurchases(PendingPurchasesParams.newBuilder().enableOneTimeProducts().build()).enableAutoServiceReconnection().setListener((result,purchases)->{
   if(result.getResponseCode()==BillingClient.BillingResponseCode.OK&&purchases!=null){for(Purchase p:purchases)handlePurchase(p);}
   else if(purchaseRequest!=null){String id=purchaseRequest;purchaseRequest=null;purchaseProduct=null;error(id,result.getResponseCode()==BillingClient.BillingResponseCode.USER_CANCELED?"Purchase canceled. No Tips were spent.":"Purchase unavailable. Please try again.");}
  }).build();
  billing.startConnection(new BillingClientStateListener(){
   @Override public void onBillingSetupFinished(BillingResult result){if(result.getResponseCode()==BillingClient.BillingResponseCode.OK){queryProduct();recoverPurchases();}}
   @Override public void onBillingServiceDisconnected(){}
  });
 }
 private void queryProduct(){
  if(BuildConfig.BILLING_KEY.isEmpty()||billing==null||!billing.isReady())return;
  List<QueryProductDetailsParams.Product> requested=new ArrayList<>();
  for(String productId:TipCatalog.IDS)requested.add(QueryProductDetailsParams.Product.newBuilder().setProductId(productId).setProductType(BillingClient.ProductType.INAPP).build());
  QueryProductDetailsParams params=QueryProductDetailsParams.newBuilder().setProductList(requested).build();
  billing.queryProductDetailsAsync(params,(result,details)->runOnUiThread(()->{
   products.clear();
   if(result.getResponseCode()==BillingClient.BillingResponseCode.OK)for(ProductDetails found:details.getProductDetailsList())if(TipCatalog.count(found.getProductId())>0)products.put(found.getProductId(),found);
   if(web!=null&&!isFinishing())web.evaluateJavascript("window.dispatchEvent(new Event('block-block-catalog'))",null);
  }));
 }
 private void recoverPurchases(){billing.queryPurchasesAsync(QueryPurchasesParams.newBuilder().setProductType(BillingClient.ProductType.INAPP).build(),(result,purchases)->{if(result.getResponseCode()==BillingClient.BillingResponseCode.OK)runOnUiThread(()->{for(Purchase p:purchases)handlePurchase(p);});});}
 private void buy(String id,String productId){
  if(!audienceReady){error(id,"Choose your age range before using the store.");return;}
  ProductDetails product=products.get(productId);
  if(TipCatalog.count(productId)==0){error(id,"Unknown Tip pack.");return;}
  if(product==null||billing==null||!billing.isReady()||product.getOneTimePurchaseOfferDetails()==null){queryProduct();error(id,"This pack is not available on Google Play yet. Please try again later.");return;}
  if(purchaseRequest!=null){error(id,"A purchase is already in progress.");return;}
  purchaseRequest=id;purchaseProduct=productId;
  BillingFlowParams.ProductDetailsParams.Builder item=BillingFlowParams.ProductDetailsParams.newBuilder().setProductDetails(product);
  if(product.getOneTimePurchaseOfferDetails()!=null&&product.getOneTimePurchaseOfferDetails().getOfferToken()!=null)item.setOfferToken(product.getOneTimePurchaseOfferDetails().getOfferToken());
  BillingResult result=billing.launchBillingFlow(this,BillingFlowParams.newBuilder().setProductDetailsParamsList(Collections.singletonList(item.build())).build());
  if(result.getResponseCode()!=BillingClient.BillingResponseCode.OK){purchaseRequest=null;purchaseProduct=null;error(id,"Google Play could not start the purchase.");}
 }
 private boolean verified(Purchase purchase){
  try{byte[] key=android.util.Base64.decode(BuildConfig.BILLING_KEY,android.util.Base64.DEFAULT);PublicKey publicKey=KeyFactory.getInstance("RSA").generatePublic(new X509EncodedKeySpec(key));Signature verifier=Signature.getInstance("SHA1withRSA");verifier.initVerify(publicKey);verifier.update(purchase.getOriginalJson().getBytes(java.nio.charset.StandardCharsets.UTF_8));return verifier.verify(android.util.Base64.decode(purchase.getSignature(),android.util.Base64.DEFAULT));}catch(Exception e){return false;}
 }
 private void handlePurchase(Purchase purchase){
  if(purchase.getProducts().size()!=1)return;
  String productId=purchase.getProducts().get(0);
  if(TipCatalog.count(productId)==0)return;
  boolean matches=purchaseRequest!=null&&productId.equals(purchaseProduct);
  if(purchase.getPurchaseState()!=Purchase.PurchaseState.PURCHASED){if(matches){reply(purchaseRequest,object("message","Payment is pending. Tips are added only after Google Play confirms payment."));purchaseRequest=null;purchaseProduct=null;}return;}
  if(!verified(purchase)){if(matches){error(purchaseRequest,"Purchase verification is pending. Reopen the app to retry; no purchase has been consumed.");purchaseRequest=null;purchaseProduct=null;}return;}
  Set<String> processed=new HashSet<>(wallet.getStringSet("processed",Collections.emptySet()));String token=purchase.getPurchaseToken();
  // Save grant and token together BEFORE consuming. Retries cannot duplicate credit.
  if(!processed.contains(token)){
   final int newBalance;
   try{newBalance=TipCatalog.grant(productId,purchase.getQuantity(),credits());}catch(Exception e){if(matches){error(purchaseRequest,"Could not add this pack. Contact support; the purchase has not been consumed.");purchaseRequest=null;purchaseProduct=null;}return;}
   processed.add(token);
   if(!wallet.edit().putInt("credits",newBalance).putStringSet("processed",processed).commit()){if(matches){error(purchaseRequest,"Could not save Tips. Reopen the app to recover the purchase.");purchaseRequest=null;purchaseProduct=null;}return;}
  }
  billing.consumeAsync(ConsumeParams.newBuilder().setPurchaseToken(token).build(),(result,consumed)->{});
  if(matches){reply(purchaseRequest,object("credits",credits(),"message","Your Tips are ready. Tap Use 1 Tip to reveal the trail."));purchaseRequest=null;purchaseProduct=null;}
 }
 @Override protected void onResume(){super.onResume();if(web!=null)web.onResume();if(billing!=null&&billing.isReady()){queryProduct();recoverPurchases();}}
 @Override protected void onPause(){if(web!=null)web.onPause();super.onPause();}
 private void handleBack(){
  if(adBusy)return;
  if(web.canGoBack()){web.goBack();return;}
  web.evaluateJavascript("(()=>{const d=document.querySelector('dialog[open]');if(d){if(!document.getElementById('close-tip').disabled)d.close();return true;}const p=document.getElementById('play-screen');if(p&&!p.hidden){document.getElementById('level-menu').click();return true;}return false;})()",handled->{if("false".equals(handled))finish();});
 }
 @Override protected void onDestroy(){if(billing!=null)billing.endConnection();if(web!=null){web.removeJavascriptInterface("BlockBlockNative");web.destroy();}super.onDestroy();}
}
