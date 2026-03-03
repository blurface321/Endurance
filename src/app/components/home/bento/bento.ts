import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface FeatureCard {
  label: string;
  headline: string;
  subHeadline?: string;
  image: string;
}

@Component({
  selector: 'app-bento',
  imports: [
    CommonModule
  ],
  templateUrl: './bento.html',
  styleUrl: './bento.scss',
})
export class Bento {
  headerTitle = "Optimize Your Every Day";
  headerDescription = "From stress and energy to sleep and habits, Endurance helps you stay in sync with your body and build routines that support it.";

  cards:FeatureCard[] = [
    {
      label: 'Metabolic Stress',
      headline: 'Identify inflammation triggers',
      image: '../../../assets/images/Inflammation.png'
    },
    {
      label: 'Energy Bank',
      headline: 'Know when to push,',
      subHeadline: 'and when to rest',
      image: '../../../assets/images/Energy.png'
    },
    {
      label: 'Sleep Insights',
      headline: 'Wake up to',
      subHeadline: 'actionable data',
      image: '../../../assets/images/SleepInsight.png'
    },
    {
      label: 'Journal',
      headline: 'Track and build healthy habits',
      image: '../../../assets/images/Journal.png'
    }
  ]
}
