import { WebView } from 'ui/web-view';
import * as application from 'application';

import { OnGestureListener } from './android/on-gesture-listener';
import { SwipeDirection } from './swipe-direction';

export class EpubGestureDetector {
  private onGestureListener = new OnGestureListener();
  private gestureDetector = new android.view.GestureDetector(
    application.android.context,
    this.onGestureListener
  );

  constructor(epubWebView: WebView) {
    epubWebView.android.setOnTouchListener(
      new android.view.View.OnTouchListener({
        onTouch: (
          view: android.view.View,
          event: android.view.MotionEvent
        ): boolean => this.onTouchEvent(event)
      })
    )
  }

  public onSwipe(callback: (swipeDirection: SwipeDirection) => void): void {
    this.onGestureListener.onSwipe(callback);
  }

  private onTouchEvent(event: android.view.MotionEvent): boolean {
    return this.gestureDetector.onTouchEvent(event);
  }
}
