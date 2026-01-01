import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-insights',
  imports: [],
  templateUrl: './insights.html',
  styleUrl: './insights.scss',
})
export class Insights implements AfterViewInit, OnDestroy {
  miniCards = [
    { id: 1, src: '../../../assets/svg_icons/Insight1.svg', alt: 'Insight 1' },
    { id: 2, src: '../../../assets/svg_icons/Insight2.svg', alt: 'Insight 2' },
    { id: 3, src: '../../../assets/svg_icons/Insight3.svg', alt: 'Insight 3' },
    { id: 4, src: '../../../assets/svg_icons/Insight4.svg', alt: 'Insight 4' },
    { id: 5, src: '../../../assets/svg_icons/Insight5.svg', alt: 'Insight 5' }
  ]

  @ViewChild('svgEl', { static: true }) svgEl!: ElementRef<HTMLImageElement>

  currentIndex:number = 0
  private intervalId!: number;

  private readonly FADE_IN_MS = 1000;
  private readonly HOLD_MS = 5000;
  private readonly FADE_OUT_MS = 1000;

  constructor(){}

  ngAfterViewInit(): void {
    this.svgEl.nativeElement.src = this.miniCards[this.currentIndex].src
    // this.startLoop();
    this.fadeIn()
  }

  private fadeIn() {
    const el = this.svgEl.nativeElement

    el.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: this.FADE_IN_MS, easing: 'ease-in-out', fill: 'forwards' }
    )

    this.intervalId = window.setTimeout(() => this.fadeOut(), this.HOLD_MS)
  }

  private fadeOut() {
    const el = this.svgEl.nativeElement

    const anim = el.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: this.FADE_OUT_MS, easing: 'ease-in-out', fill: 'forwards' }
    );

    anim.onfinish = () => {
      this.currentIndex = (this.currentIndex + 1) % this.miniCards.length
      el.src = this.miniCards[this.currentIndex].src
      this.fadeIn();
    }
  }

  // startLoop(){
  //   this.intervalId = window.setInterval(() => {
  //     this.fadeOutAndSwap();
  //   }, 2000);
  // }

  // fadeOutAndSwap(){
  //   const el = this.svgEl.nativeElement;

  //   const fadeOut = el.animate(
  //     [{opacity: 1}, {opacity: 0}],
  //     {duration: this.FADE_IN_MS, easing: 'ease-in-out', fill: 'forwards'}
  //   );

  //   fadeOut.onfinish = () => {
  //     this.currentIndex = (this.currentIndex + 1) % this.miniCards.length;
  //     el.src = this.miniCards[this.currentIndex].src

  //     el.animate(
  //       [{opacity: 0}, {opacity: 1}],
  //       {duration: 600, easing: 'ease-in-out', fill: 'forwards'}
  //     )
  //   }
  // }

  ngOnDestroy(): void {
    clearInterval(this.intervalId)
  }
}
