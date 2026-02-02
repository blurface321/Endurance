import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Fade } from "../../../directives/fade";

@Component({
  selector: 'app-ask-endurance',
  imports: [

  ],
  templateUrl: './ask-endurance.html',
  styleUrl: './ask-endurance.scss',
})
export class AskEndurance implements OnInit, OnDestroy {
  constructor(private cdr: ChangeDetectorRef){}

  phrases: string[] = [
    "Show me the relationship between my sugar intake and my Sleep Impact Score over the last week.",
    "Visualize my probiotic vs. prebiotic intake for the last 10 days.",
    "Show me the consistency of my meal timings over the last month.",
    "Compare my hydration levels with my reported bloating incidents."
  ];
  resultSvgs: string[] = [
    '../../../assets/svg_icons/Q1Answer.svg',
    '../../../assets/svg_icons/Q2Answer.svg'
  ]

  public loopNum: number = 0;
  public isDeleting: boolean = false;
  public txt: string = '';
  public typingSpeed: number = 100;
  public timeoutId: any; 
  public isPaused: boolean = false;
  public isThinking: boolean = false
  public isResultVisible: boolean = false
  public showResultContainer: boolean = false; 

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
        
        this.showResultContainer = true;
        this.cdr.detectChanges();

        setTimeout(() => {
            this.isResultVisible = true;
            this.cdr.detectChanges();
        }, 50);

        this.timeoutId = setTimeout(() => {
          this.isResultVisible = false
          this.cdr.detectChanges();
          setTimeout(() => {
            this.showResultContainer = false; 
            this.isDeleting = true;     
            this.cdr.detectChanges(); 
            this.typeWriter();          
          }, 500);
        }, 4000); 

      }, Math.random() * 2000 + 1000);

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
      this.typingSpeed = 10;
    } else {
      this.txt = fullText.substring(0, this.txt.length + 1);
      this.typingSpeed = 15;
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
