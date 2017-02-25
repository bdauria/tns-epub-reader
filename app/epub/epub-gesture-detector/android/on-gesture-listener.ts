import { Subject } from 'rxjs';

import { SwipeDirection } from '../swipe-direction';

export class OnGestureListener extends
  android.view.GestureDetector.SimpleOnGestureListener {
  private readonly swipeDistanceThreshold = 100;
  private readonly swipeVelocityThreshold = 100;

  private swipe = new Subject<SwipeDirection>();

  constructor() {
    super();
    return global.__native(this);
  }

  public onSwipe(callback: (swipeDirection: SwipeDirection) => void): void {
    this.swipe.subscribe(swipeDirection => callback(swipeDirection));
  }

  public onDown(event: android.view.MotionEvent): boolean {
    return true;
  }

  public onFling(
    firstEvent: android.view.MotionEvent,
    secondEvent: android.view.MotionEvent,
    velocityX: number,
    velocityY: number
  ): boolean {
    const swipeDistance = secondEvent.getX() - firstEvent.getX();
    if (this.swipeLongEnough(swipeDistance) &&
      this.swipeFastEnough(velocityX)) {
      const swipeDirection = this.swipeDirectionFrom(swipeDistance);
      this.swipe.next(swipeDirection);
    }
    return true;
  }

  private swipeLongEnough(swipeDistance: number) {
    return Math.abs(swipeDistance) > this.swipeDistanceThreshold;
  }

  private swipeFastEnough(velocityY: number) {
    return Math.abs(velocityY) > this.swipeVelocityThreshold;
  }

  public swipeDirectionFrom(swipeDistance: number): SwipeDirection {
    return swipeDistance > 0 ? SwipeDirection.Left : SwipeDirection.Right;
  }
}
