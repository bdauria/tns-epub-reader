import { WebView } from 'ui/web-view';

export class WebViewEpubifier {
  public epubify(webView: WebView): void {
    webView.android.getSettings().setAllowFileAccessFromFileURLs(true);
    webView.android.getSettings().setBuiltInZoomControls(false);
    webView.android.getSettings().setDisplayZoomControls(false);
  }
}
