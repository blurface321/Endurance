import { Component } from '@angular/core';

export interface CardData {
  backgroundUrl: string; 
  innerSvgs: string[];   
  title: string;         
  description: string;   
}

@Component({
  selector: 'app-tracking',
  imports: [],
  templateUrl: './tracking.html',
  styleUrl: './tracking.scss',
})
export class Tracking {
  cards: CardData[] = [
    {
      backgroundUrl: '../../../assets/images/bg7.png',
      innerSvgs: [
        '../../../assets/svg_icons/Calories.svg',
        '../../../assets/svg_icons/HiddenItems.svg',
        '../../../assets/svg_icons/HealthScore.svg'
      ],
      title: 'Monitor your calories',
      description: 'Track your daily nutritional intake with precise macronutrient breakdowns.'
    },
    {
      backgroundUrl: '../../../assets/images/bg6.png',
      innerSvgs: [
        '../../../assets/svg_icons/SleepImpact.svg',
        '../../../assets/svg_icons/SleepInsights.svg',
        '../../../assets/svg_icons/SleepImpactBreakdown.svg'
      ],
      title: 'Get a sleep impact score',
      description: 'Analyze how your diet and activity levels affect your nightly rest and recovery.'
    },
    {
      backgroundUrl: '../../../assets/images/bg4.png',
      innerSvgs: [
        '../../../assets/svg_icons/GutScore.svg',
        '../../../assets/svg_icons/GutInsights.svg' 
      ],
      title: 'Control your gut health',
      description: 'Receive personalized meal suggestions to optimize your microbiome diversity.'
    }
  ];
}
