import { Component, OnDestroy, OnInit } from '@angular/core';
import { Fade } from "../../../directives/fade";
import { ScrollObserve } from '../../../directives/scroll-observe';

@Component({
  selector: 'app-calories',
  imports: [
    Fade,
    ScrollObserve
],
  templateUrl: './calories.html',
  styleUrl: './calories.scss',
})
export class Calories implements OnInit, OnDestroy {
  phrases: string[] = [
    "How much did I eat today?",
    "On which days am I not hitting my goals?",
    "Is this meal gut-friendly?",
    "What's were my major sources of protien in the past week?"
  ];

  private loopNum: number = 0;
  private isDeleting: boolean = false;
  private txt: string = '';
  private typingSpeed: number = 100;
  private timeoutId: any; 
  private isPaused: boolean = false;

  ngOnInit(): void {
    this.typeWriter();
  }

  ngOnDestroy(): void {
    if(this.timeoutId){
      clearTimeout(this.timeoutId)
    }
  }

  typeWriter(){
    if(this.isPaused) return;

    const i: number = this.loopNum % this.phrases.length;
    const fullText: string = this.phrases[i]

    if(this.isDeleting){
      this.txt = fullText.substring(0, this.txt.length - 1);
      this.typingSpeed = 50
    } else {
      this.txt = fullText.substring(0, this.txt.length + 1);
      this.typingSpeed = 100
    }

    const inputEl = document.getElementById('typingInput') as HTMLInputElement;
    if(inputEl){
      inputEl.placeholder = this.txt
    }

    let delta: number = this.typingSpeed

    if(!this.isDeleting && this.txt === fullText){
      delta = 2000
      this.isDeleting = true
    } else if(this.isDeleting && this.txt === ''){
      this.isDeleting = false
      this.loopNum++;
      delta = 500
    }

    this.timeoutId = setTimeout(() => {
      this.typeWriter();
    }, delta)
  }
}
