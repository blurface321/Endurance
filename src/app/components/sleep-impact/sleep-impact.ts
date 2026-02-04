import { Component, OnDestroy, OnInit } from '@angular/core';
import { Fade } from '../../../directives/fade';

@Component({
  selector: 'app-sleep-impact',
  imports: [
    Fade
],
  templateUrl: './sleep-impact.html',
  styleUrl: './sleep-impact.scss',
})
export class SleepImpact implements OnInit, OnDestroy {
  phrases: string[] = [
    "What were my top sleep disruptors from food last week?",
    "On which nights was my sleep score below 70?",
    "What's my average sleep impact from late meals?",
    "How consistent has my bedtime been this month?"
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
      this.typingSpeed = 20
    } else {
      this.txt = fullText.substring(0, this.txt.length + 1);
      this.typingSpeed = 50
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
