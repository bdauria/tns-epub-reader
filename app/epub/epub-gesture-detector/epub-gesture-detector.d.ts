import { WebView }  from 'ui/web-view';

import { SwipeDirection } from './swipe-direction';

export declare class EpubGestureDetector {
  constructor(webView: WebView);

  public onSwipe(callback: (swipeDirection: SwipeDirection) => void): void;
}
