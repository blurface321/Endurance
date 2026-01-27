import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollObserve]'
})
export class ScrollObserve implements AfterViewInit{

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderer.addClass(this.el.nativeElement, 'scroll-hidden');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting){
          this.renderer.addClass(this.el.nativeElement, 'in-view')
          observer.unobserve(this.el.nativeElement)
        }
      });
    }, { threshold: 0.4 })

    observer.observe(this.el.nativeElement)
  }

}
