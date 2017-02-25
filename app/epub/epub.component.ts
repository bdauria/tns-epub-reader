import {
  Component,
  OnInit,
  ElementRef,
  ViewChild
} from '@angular/core';

import { WebView } from 'ui/web-view';

import { WebViewInterface } from 'nativescript-webview-interface';

import { SwipeDirection } from './epub-gesture-detector/swipe-direction';
import { WebViewEpubifier } from './web-view-epubifier/web-view-epubifier';
import { EpubGestureDetector } from './epub-gesture-detector/epub-gesture-detector';

@Component({
  selector: 'epub',
  template: `<WebView #epubWebView></WebView>`
})
export class EpubComponent implements OnInit {
  private webViewInterface: WebViewInterface;
  private epubGestureDetector: EpubGestureDetector;

  @ViewChild('epubWebView')
  epubWebViewRef: ElementRef;

  public get epubWebView(): WebView {
    return this.epubWebViewRef.nativeElement;
  }

  public ngOnInit(): void {
    this.epubifyWebView();
    this.loadEpubInWebView()
    this.detectSwipesInWebView();
  }

  private epubifyWebView(): void {
    const webViewEpubifier = new WebViewEpubifier();
    webViewEpubifier.epubify(this.epubWebView);
  }

  private loadEpubInWebView(): void {
    this.webViewInterface = new WebViewInterface(this.epubWebView,
      '~/www/epub.html');
    this.epubWebView.on(WebView.loadFinishedEvent, () => {
      this.webViewInterface.emit('loadBook', 'moby-dick.epub');
    });
  }

  private detectSwipesInWebView(): void {
    this.epubGestureDetector = new EpubGestureDetector(this.epubWebView);
    this.epubGestureDetector.onSwipe((swipeDirection) => {
      return swipeDirection === SwipeDirection.Left ? this.previousPage() :
        this.nextPage();
    })
  }

  private previousPage(): void {
    this.webViewInterface.emit('previousPage', {});
  }

  private nextPage(): void {
    this.webViewInterface.emit('nextPage', {});
  }
}
