import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-ask-endurance',
  imports: [],
  templateUrl: './ask-endurance.html',
  styleUrl: './ask-endurance.scss',
})
export class AskEndurance implements OnInit, OnDestroy {
  constructor(private cdr: ChangeDetectorRef){}

  phrases: string[] = [
    "How much did I eat today?",
    "On which days am I not hitting my goals?",
    "Is this meal gut-friendly?",
    "What's were my major sources of protien in the past week?"
  ];

  public loopNum: number = 0;
  public isDeleting: boolean = false;
  public txt: string = '';
  public typingSpeed: number = 100;
  public timeoutId: any; 
  public isPaused: boolean = false;
  public isThinking: boolean = false

  ngOnInit(): void {
    this.typeWriter();
  }

  ngOnDestroy(): void {
    if(this.timeoutId){
      clearTimeout(this.timeoutId)
    }
  }

  typeWriter() {
    if (this.isPaused) return;

    const i = this.loopNum % this.phrases.length;
    const fullText = this.phrases[i];

    if (!this.isDeleting && this.txt === fullText) {
      
      this.isThinking = true;
      this.cdr.detectChanges(); 

      this.timeoutId = setTimeout(() => {
        this.isThinking = false;
        this.isDeleting = true;
        this.cdr.detectChanges(); 
        this.typeWriter();        
      }, Math.random()*3000 + 560);

      return; 
    }

    if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      
      this.timeoutId = setTimeout(() => {
        this.typeWriter();
      }, 500);
      
      return;
    }

    if (this.isDeleting) {
      this.txt = fullText.substring(0, this.txt.length - 1);
      this.typingSpeed = 50;
    } else {
      this.txt = fullText.substring(0, this.txt.length + 1);
      this.typingSpeed = 100;
    }


    const inputEl = document.getElementById('typingInput1') as HTMLInputElement;
    if (inputEl) {
      inputEl.placeholder = this.txt;
    }

    this.timeoutId = setTimeout(() => {
      this.typeWriter();
    }, this.typingSpeed);
  }
}
