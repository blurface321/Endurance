import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, ElementRef, NgZone, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';

export interface CarouselCard {
  bgClass: string;
  overlayLabel: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-horizontal-carousel',
  imports: [
    CommonModule
  ],
  templateUrl: './horizontal-carousel.html',
  styleUrl: './horizontal-carousel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalCarousel implements OnInit, OnDestroy {
  @ViewChild('track',    { static: true }) trackRef!:    ElementRef<HTMLElement>;
  @ViewChild('viewport', { static: true }) viewportRef!: ElementRef<HTMLElement>;
  @ViewChild('dotsEl',   { static: true }) dotsRef!:     ElementRef<HTMLElement>;

  private readonly CARD_WIDTH_VW  = 45;
  private readonly GAP_PX         = 50;
  private readonly INTERVAL_MS    = 5000;
  private readonly DRAG_THRESHOLD = 60;
  private readonly CLONE_OFFSET   = 2; 


  private get cardWidth(): number {
    return window.innerWidth * this.CARD_WIDTH_VW / 100;
  }

  readonly cards: CarouselCard[] = [
    {
      bgClass: 'card-bg--1',
      overlayLabel: 'Body Composition',
      title: 'Watch Your Body Change',
      desc: 'Get a full picture of progress by monitoring body composition over time, from muscle gain to fat loss.',
    },
    {
      bgClass: 'card-bg--2',
      overlayLabel: 'Cardio Focus',
      title: 'Dial In Your Cardio Focus',
      desc: 'Train with intention by staying in the right heart rate zone to build aerobic fitness and cardiovascular strength.',
    },
    {
      bgClass: 'card-bg--3',
      overlayLabel: 'Cardio Load',
      title: 'Balance Your Cardio Load',
      desc: 'Go beyond minutes and miles. Cardio Load uses the science of effort to measure what your training actually does.',
    },
    {
      bgClass: 'card-bg--4',
      overlayLabel: 'Recovery',
      title: 'Know When to Push, When to Rest',
      desc: 'Recovery metrics give you real-time insight into how your body is adapting so you never overtrain.',
    },
  ];

  clonedCards: CarouselCard[] = [];

  private activeIndex = this.CLONE_OFFSET;
  private isDragging  = false;
  private dragStartX  = 0;
  private didDrag     = false;
  private timer: any  = null;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    const n = this.cards.length;
    this.clonedCards = [
      { ...this.cards[n - 2] },
      { ...this.cards[n - 1] },
      ...this.cards.map(c => ({ ...c })),
      { ...this.cards[0] },
      { ...this.cards[1] },
    ];
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.setTranslate(false);
      this.startAutoplay();
      this.bindPointerEvents();
      window.addEventListener('resize', () => this.setTranslate(false));
    });
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  private bindPointerEvents(): void {
    const vp = this.viewportRef.nativeElement;

    vp.addEventListener('pointerdown', (e: PointerEvent) => {
      this.isDragging = true;
      this.didDrag    = false;
      this.dragStartX = e.clientX;
      vp.setPointerCapture(e.pointerId);
      this.stopAutoplay();
    });

    vp.addEventListener('pointermove', (e: PointerEvent) => {
      if (this.isDragging && Math.abs(e.clientX - this.dragStartX) > 5) {
        this.didDrag = true;
      }
    });

    vp.addEventListener('pointerup', (e: PointerEvent) => {
      if (!this.isDragging) return;
      this.isDragging = false;
      const dx = e.clientX - this.dragStartX;
      if (this.didDrag) {
        if      (dx < -this.DRAG_THRESHOLD) this.next();
        else if (dx >  this.DRAG_THRESHOLD) this.prev();
      }
      this.restartAutoplay();
    });

    vp.addEventListener('pointercancel', () => {
      this.isDragging = false;
      this.restartAutoplay();
    });
  }

  private next(): void { this.move(1); }
  private prev(): void { this.move(-1); }

  private move(dir: number): void {
    this.activeIndex += dir;
    this.setTranslate(true);
    this.trackRef.nativeElement.addEventListener(
      'transitionend', () => this.onTransEnd(), { once: true }
    );
  }

  onDotClick(dotIdx: number): void {
    this.ngZone.runOutsideAngular(() => {
      this.activeIndex = dotIdx + this.CLONE_OFFSET;
      this.setTranslate(true);
      this.trackRef.nativeElement.addEventListener(
        'transitionend', () => this.onTransEnd(), { once: true }
      );
      this.restartAutoplay();
    });
  }

  private onTransEnd(): void {
    const n      = this.cards.length;
    const offset = this.CLONE_OFFSET;
    if (this.activeIndex > n + offset - 1) {
      this.activeIndex -= n;
      this.setTranslate(false);
    } else if (this.activeIndex < offset) {
      this.activeIndex += n;
      this.setTranslate(false);
    }
  }

  private setTranslate(animate: boolean): void {
    const track    = this.trackRef.nativeElement;
    const viewport = this.viewportRef.nativeElement;
    const cardW    = this.cardWidth;
    const step     = cardW + this.GAP_PX;
    const offset   = (viewport.offsetWidth - cardW) / 2;
    const tx       = -this.activeIndex * step + offset;

    if (!animate) {
      track.classList.add('no-transition');
      track.style.transition = 'none';
      track.style.transform  = `translateX(${tx}px)`;
      this.updateActive();
      this.updateDots();
      track.getBoundingClientRect();
      requestAnimationFrame(() => track.classList.remove('no-transition'));
    } else {
      track.style.transition = 'transform 0.65s cubic-bezier(0.4,0,0.2,1)';
      track.style.transform  = `translateX(${tx}px)`;
      this.updateActive();
      this.updateDots();
    }
  }

  private updateActive(): void {
    this.trackRef.nativeElement
      .querySelectorAll<HTMLElement>('.carousel-item')
      .forEach((el, i) => {
        const isAct = i === this.activeIndex;
        el.classList.toggle('active', isAct);
        (el.querySelector('.carousel-card') as HTMLElement)
          ?.classList.toggle('active', isAct);
      });
  }

  private updateDots(): void {
    const n    = this.cards.length;
    const real = ((this.activeIndex - this.CLONE_OFFSET) % n + n) % n;
    this.dotsRef.nativeElement
      .querySelectorAll<HTMLElement>('.dot')
      .forEach((d, i) => d.classList.toggle('dot--active', i === real));
  }


  private startAutoplay(): void {
    this.timer = setInterval(() => this.next(), this.INTERVAL_MS);
  }

  private stopAutoplay(): void {
    clearInterval(this.timer);
  }

  private restartAutoplay(): void {
    this.stopAutoplay();
    this.startAutoplay();
  }
}
