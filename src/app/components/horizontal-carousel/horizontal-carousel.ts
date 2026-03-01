import { CommonModule } from '@angular/common';
import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  color: string;
}

@Component({
  selector: 'app-horizontal-carousel',
  imports: [
    CommonModule
  ],
  templateUrl: './horizontal-carousel.html',
  styleUrl: './horizontal-carousel.scss',
})
export class HorizontalCarousel implements OnInit, OnDestroy {
  items: CarouselItem[] = [
    {
      id: 1,
      title: 'Dial In Your Cardio Focus',
      description: 'Train with intention by staying in the right heart rate zone to build aerobic fitness and cardiovascular strength.',
      color: '#a8c0ff' 
    },
    {
      id: 2,
      title: 'Balance Your Cardio Load',
      description: 'Go beyond minutes and miles. Cardio Load uses heart rate and effort to measure what your training actually does for your body.',
      color: '#fbc2eb' 
    },
    {
      id: 3,
      title: 'Built for Strength',
      description: "Whether you're lifting heavy or just getting started, track your strength and show how you're progressing.",
      color: '#e0c3fc'
    },
    {
      id: 4,
      title: 'Recovery & Rest',
      description: 'Understand exactly how much sleep and recovery your body needs after intense workouts.',
      color: '#8ec5fc'
    }
  ];

  extendedItems: CarouselItem[] = [];
  activeIndex = signal(2);
  visualIndex = signal(2);
  activeItemId = computed(
    () => this.extendedItems[this.visualIndex()]?.id
  )
  transitionEnabled = signal(true);

  private intervalId: any;
  private isAnimating = false;

  ngOnInit(): void {
    this.setupInfiniteLoop();
    this.startAutoSlide();  
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  setupInfiniteLoop() {
    const len = this.items.length;
    
    // this.extendedItems = [
    //   this.items[len - 2],
    //   this.items[len - 1],
    //   ...this.items,
    //   this.items[0],
    //   this.items[1]
    // ];

    const clone = (item: CarouselItem, suffix: string): CarouselItem => ({
      ...item,
      id: Number(`${item.id}${suffix}`) 
    });

    this.extendedItems = [
      clone(this.items[len - 2], '01'),
      clone(this.items[len - 1], '02'),
      ...this.items,
      clone(this.items[0], '03'),
      clone(this.items[1], '04'),
    ];
  }

  startAutoSlide(){
    this.intervalId = setInterval(() => {
      this.next();
    }, 5000)
  }

  stopAutoSlide(){
    if(this.intervalId){
      clearInterval(this.intervalId)
    }
  }

  next(){
    if (this.isAnimating) return;
    this.isAnimating = true;

    this.transitionEnabled.set(true);
    this.activeIndex.update(i => i + 1);
    this.visualIndex.update(i => i + 1);

    const lastCloneIndex = this.extendedItems.length - 2;

    if (this.activeIndex() === lastCloneIndex) {
      setTimeout(() => this.teleport(2), 500);
    } else {
      setTimeout(() => (this.isAnimating = false), 500);
    }
  }

  prev() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    this.transitionEnabled.set(true);
    this.activeIndex.update(i => i - 1);
    this.visualIndex.update(i => i - 1);

    if (this.activeIndex() === 1) {
      const realLastIndex = this.extendedItems.length - 3;
      setTimeout(() => this.teleport(realLastIndex), 500);
    } else {
      setTimeout(() => (this.isAnimating = false), 500);
    }
  }

  teleport(newIndex: number) {
    this.transitionEnabled.set(false);
    this.activeIndex.set(newIndex);
    this.visualIndex.set(newIndex)

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // this.visualIndex.set(newIndex);
        this.transitionEnabled.set(true);
        this.isAnimating = false;
      });
    });
  }
}
