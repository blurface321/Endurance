import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFade]'
})
export class Fade implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2) { }
  @Input() threshold!: number;

  ngAfterViewInit(): void {
    this.renderer.addClass(this.el.nativeElement, 'hidden-on-scroll');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting) {
          this.renderer.addClass(this.el.nativeElement, 'is-visible');
          observer.unobserve(this.el.nativeElement);
        }
      });
    }, {
      threshold: this.threshold
    });

    observer.observe(this.el.nativeElement);
  }

}
