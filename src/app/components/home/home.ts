import { Component, OnInit } from '@angular/core';
import { Tracking } from '../tracking/tracking';
import { FormsModule } from '@angular/forms';
import { Fade } from "../../../directives/fade";

@Component({
  selector: 'app-home',
  imports: [
    FormsModule,
    Tracking,
    Fade
],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  phrases: string[] = [
    "Suggest me some healthy breakfast options",
    "On which days am I not hitting my goals?",
    "List the top 5 caloric dense foods I consumed this week",
    "How can I control my sugar consumption?"
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
