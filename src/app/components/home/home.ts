import { Component, OnInit } from '@angular/core';
import { Tracking } from "../../tracking/tracking";
import { Insights } from "../../insights/insights";

@Component({
  selector: 'app-home',
  imports: [Tracking, Insights],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  textArray: string[] = [
    "nutritional tracking.",
    "better sleep patterns.",
    "gut health insights.",
    "weight management."
  ];
  currentText: string = "";
  loopNum: number = 0;
  isDeleting: boolean = false;
  typingSpeed: number = 100;

  ngOnInit(): void {
    this.typeWriterEffect();
  }

  typeWriterEffect(){
    const i = this.loopNum % this.textArray.length;
    const fullText = this.textArray[i];

    if (this.isDeleting) {
      this.currentText = fullText.substring(0, this.currentText.length - 1);
    } else {
      this.currentText = fullText.substring(0, this.currentText.length + 1);
    }

    let delta = this.typingSpeed;
    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.currentText === fullText) {
      delta = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentText === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(() => {
      this.typeWriterEffect();
    }, delta);
  }
}
