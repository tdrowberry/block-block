package com.lalaolemur.blockblock;

import androidx.activity.ComponentActivity;
import androidx.activity.OnBackPressedCallback;
import android.os.Bundle;
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
import com.google.android.ump.*;
import org.json.*;
import java.util.*;
import java.security.*;
import java.security.spec.X509EncodedKeySpec;

public class MainActivity extends ComponentActivity {
 private WebView web;
 private SharedPreferences wallet;
 private BillingClient billing;
 private ProductDetails product;
 private ConsentInformation consent;
 private boolean adsInitialized=false,adBusy=false;
 private String purchaseRequest=null;
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
  web.loadUrl(ORIGIN+"/assets/game/index.html");
  initBilling();
  consent=UserMessagingPlatform.getConsentInformation(this);
  consent.requestConsentInfoUpdate(this,new ConsentRequestParameters.Builder().build(),()->UserMessagingPlatform.loadAndShowConsentFormIfRequired(this,error->initAds()),error->initAds());
 }
 private void initAds(){if(consent.canRequestAds()&&!adsInitialized){adsInitialized=true;MobileAds.initialize(this,status->{});}}
 private int credits(){return wallet.getInt("credits",0);}
 private JSONObject object(Object... pairs){JSONObject o=new JSONObject();try{for(int i=0;i<pairs.length;i+=2)o.put((String)pairs[i],pairs[i+1]);}catch(JSONException ignored){}return o;}
 private void reply(String id,JSONObject result){
  try{result.put("id",id);}catch(JSONException ignored){}
  runOnUiThread(()->{if(!isFinishing())web.evaluateJavascript("window.dispatchEvent(new CustomEvent('block-block-store',{detail:"+result+"}));",null);});
 }
 private void error(String id,String message){reply(id,object("error",message));}
 private String price(){return product!=null&&product.getOneTimePurchaseOfferDetails()!=null?product.getOneTimePurchaseOfferDetails().getFormattedPrice():"";}
 private class Bridge {
  @JavascriptInterface public void request(String raw){
   runOnUiThread(()->{
    String id="";
    try{
     JSONObject request=new JSONObject(raw);id=request.getString("id");String action=request.getString("action");
     if(web.getUrl()==null||!web.getUrl().startsWith(ORIGIN+"/assets/game/")){error(id,"Unavailable page.");return;}
     switch(action){
      case "status":reply(id,object("credits",credits(),"price",price(),"ads",adsInitialized&&consent.canRequestAds(),"testAds",BuildConfig.DEBUG));break;
      case "spend":
       if(credits()<1){error(id,"No Tips available. Watch an ad or buy a pack first.");break;}
       if(!wallet.edit().putInt("credits",credits()-1).commit()){error(id,"Could not save your balance. Please try again.");break;}
       reply(id,object("credits",credits(),"spent",true));break;
      case "ad":showRewarded(id);break;
      case "buy":buy(id);break;
      case "privacy":
       final String privacyId=id;
       if(consent.getPrivacyOptionsRequirementStatus()!=ConsentInformation.PrivacyOptionsRequirementStatus.REQUIRED){reply(id,object("message","No additional ad privacy choices are currently required."));break;}
       UserMessagingPlatform.showPrivacyOptionsForm(MainActivity.this,e->{initAds();if(e!=null)error(privacyId,"Privacy choices are temporarily unavailable.");else reply(privacyId,object("message","Privacy choices saved."));});break;
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
    final boolean[] earned={false},saved={false};
    ad.setFullScreenContentCallback(new FullScreenContentCallback(){
     @Override public void onAdDismissedFullScreenContent(){adBusy=false;if(earned[0]&&!saved[0])error(id,"Your reward could not be saved. Please check device storage.");else reply(id,object("credits",credits(),"message",earned[0]?"You earned 1 Tip. Tap Use 1 Tip to reveal the trail.":"Ad closed before a reward was earned."));}
     @Override public void onAdFailedToShowFullScreenContent(AdError e){adBusy=false;error(id,"The ad could not be shown. No Tip was spent.");}
    });
    ad.show(MainActivity.this,reward->{if(!earned[0]){earned[0]=true;saved[0]=wallet.edit().putInt("credits",credits()+1).commit();}});
   }
  });
 }
 private void initBilling(){
  billing=BillingClient.newBuilder(this).enablePendingPurchases(PendingPurchasesParams.newBuilder().enableOneTimeProducts().build()).enableAutoServiceReconnection().setListener((result,purchases)->{
   if(result.getResponseCode()==BillingClient.BillingResponseCode.OK&&purchases!=null){for(Purchase p:purchases)handlePurchase(p);}
   else if(purchaseRequest!=null){String id=purchaseRequest;purchaseRequest=null;error(id,result.getResponseCode()==BillingClient.BillingResponseCode.USER_CANCELED?"Purchase canceled. No Tips were spent.":"Purchase unavailable. Please try again.");}
  }).build();
  billing.startConnection(new BillingClientStateListener(){
   @Override public void onBillingSetupFinished(BillingResult result){if(result.getResponseCode()==BillingClient.BillingResponseCode.OK){queryProduct();recoverPurchases();}}
   @Override public void onBillingServiceDisconnected(){}
  });
 }
 private void queryProduct(){
  if(BuildConfig.BILLING_KEY.isEmpty())return;
  QueryProductDetailsParams params=QueryProductDetailsParams.newBuilder().setProductList(Collections.singletonList(QueryProductDetailsParams.Product.newBuilder().setProductId(BuildConfig.TIP_PRODUCT).setProductType(BillingClient.ProductType.INAPP).build())).build();
  billing.queryProductDetailsAsync(params,(result,details)->{if(result.getResponseCode()==BillingClient.BillingResponseCode.OK&&!details.getProductDetailsList().isEmpty())product=details.getProductDetailsList().get(0);});
 }
 private void recoverPurchases(){billing.queryPurchasesAsync(QueryPurchasesParams.newBuilder().setProductType(BillingClient.ProductType.INAPP).build(),(result,purchases)->{if(result.getResponseCode()==BillingClient.BillingResponseCode.OK)runOnUiThread(()->{for(Purchase p:purchases)handlePurchase(p);});});}
 private void buy(String id){
  if(product==null||!billing.isReady()){error(id,"Google Play purchases are not available yet. Please try again later.");return;}
  if(purchaseRequest!=null){error(id,"A purchase is already in progress.");return;}
  purchaseRequest=id;
  BillingFlowParams.ProductDetailsParams.Builder item=BillingFlowParams.ProductDetailsParams.newBuilder().setProductDetails(product);
  if(product.getOneTimePurchaseOfferDetails()!=null&&product.getOneTimePurchaseOfferDetails().getOfferToken()!=null)item.setOfferToken(product.getOneTimePurchaseOfferDetails().getOfferToken());
  BillingResult result=billing.launchBillingFlow(this,BillingFlowParams.newBuilder().setProductDetailsParamsList(Collections.singletonList(item.build())).build());
  if(result.getResponseCode()!=BillingClient.BillingResponseCode.OK){purchaseRequest=null;error(id,"Google Play could not start the purchase.");}
 }
 private boolean verified(Purchase purchase){
  try{byte[] key=android.util.Base64.decode(BuildConfig.BILLING_KEY,android.util.Base64.DEFAULT);PublicKey publicKey=KeyFactory.getInstance("RSA").generatePublic(new X509EncodedKeySpec(key));Signature verifier=Signature.getInstance("SHA1withRSA");verifier.initVerify(publicKey);verifier.update(purchase.getOriginalJson().getBytes(java.nio.charset.StandardCharsets.UTF_8));return verifier.verify(android.util.Base64.decode(purchase.getSignature(),android.util.Base64.DEFAULT));}catch(Exception e){return false;}
 }
 private void handlePurchase(Purchase purchase){
  if(!purchase.getProducts().contains(BuildConfig.TIP_PRODUCT))return;
  if(purchase.getPurchaseState()!=Purchase.PurchaseState.PURCHASED){if(purchaseRequest!=null){reply(purchaseRequest,object("message","Payment is pending. Tips are added only after Google Play confirms payment."));purchaseRequest=null;}return;}
  if(!verified(purchase)){if(purchaseRequest!=null){error(purchaseRequest,"Purchase verification is pending. Reopen the app to retry; no purchase has been consumed.");purchaseRequest=null;}return;}
  Set<String> processed=new HashSet<>(wallet.getStringSet("processed",Collections.emptySet()));String token=purchase.getPurchaseToken();
  // Save grant and token together BEFORE consuming. Retries cannot duplicate credit.
  if(!processed.contains(token)){
   processed.add(token);
   if(!wallet.edit().putInt("credits",credits()+5*purchase.getQuantity()).putStringSet("processed",processed).commit()){if(purchaseRequest!=null){error(purchaseRequest,"Could not save Tips. Reopen the app to recover the purchase.");purchaseRequest=null;}return;}
  }
  billing.consumeAsync(ConsumeParams.newBuilder().setPurchaseToken(token).build(),(result,consumed)->{});
  if(purchaseRequest!=null){reply(purchaseRequest,object("credits",credits(),"message","Your Tips are ready. Tap Use 1 Tip to reveal the trail."));purchaseRequest=null;}
 }
 @Override protected void onResume(){super.onResume();if(web!=null)web.onResume();if(billing!=null&&billing.isReady())recoverPurchases();}
 @Override protected void onPause(){if(web!=null)web.onPause();super.onPause();}
 private void handleBack(){
  if(web.canGoBack()){web.goBack();return;}
  web.evaluateJavascript("(()=>{const d=document.querySelector('dialog[open]');if(d){if(!document.getElementById('close-tip').disabled)d.close();return true;}const p=document.getElementById('play-screen');if(p&&!p.hidden){document.getElementById('level-menu').click();return true;}return false;})()",handled->{if("false".equals(handled))finish();});
 }
 @Override protected void onDestroy(){if(billing!=null)billing.endConnection();if(web!=null){web.removeJavascriptInterface("BlockBlockNative");web.destroy();}super.onDestroy();}
}
