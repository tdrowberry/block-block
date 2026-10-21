package com.lalaolemur.blockblock;
import androidx.activity.ComponentActivity;
import androidx.activity.OnBackPressedCallback;
import android.os.Bundle;
import android.content.Intent;
import android.net.Uri;
import android.webkit.*;
import android.graphics.Color;
import android.view.WindowInsets;
import androidx.webkit.WebViewAssetLoader;
public class MainActivity extends ComponentActivity {
 private WebView web;
 private static final String ORIGIN="https://appassets.androidplatform.net";
 @Override public void onCreate(Bundle state){
  super.onCreate(state);
  getOnBackPressedDispatcher().addCallback(this,new OnBackPressedCallback(true){@Override public void handleOnBackPressed(){handleBack();}});

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

  web.loadUrl(ORIGIN+"/assets/game/index.html");
 }
 @Override protected void onResume(){super.onResume();if(web!=null)web.onResume();}
 @Override protected void onPause(){if(web!=null)web.onPause();super.onPause();}
 private void handleBack(){
  if(web.canGoBack()){web.goBack();return;}
  web.evaluateJavascript("(()=>{const d=document.querySelector('dialog[open]');if(d){d.close();return true;}const p=document.getElementById('play-screen');if(p&&!p.hidden){document.getElementById('level-menu').click();return true;}return false;})()",handled->{if("false".equals(handled))finish();});
 }
 @Override protected void onDestroy(){if(web!=null)web.destroy();super.onDestroy();}
}
