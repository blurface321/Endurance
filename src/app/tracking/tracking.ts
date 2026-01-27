import { Component } from '@angular/core';
import { Fade } from '../../directives/fade';

export interface CardData {
  cardName: string
  backgroundUrl: string; 
  innerSvgs: string[];   
  title: string;         
  description: string;   
}

@Component({
  selector: 'app-tracking',
  imports: [
    Fade
  ],
  templateUrl: './tracking.html',
  styleUrl: './tracking.scss',
})
export class Tracking {
  cards: CardData[] = [
    {
      cardName: 'Calories',
      backgroundUrl: '../../../assets/images/bg7.png',
      innerSvgs: [
        '../../../assets/svg_icons/Calories.svg',
        '../../../assets/svg_icons/HealthScore.svg',
      ],
      title: 'Monitor your calories',
      description: 'Track macronutrients add, remove, edit items detected by AI for better results. Use the Health Score to instantly gauge the overall nutritional quality of your meals.'
    },
    {
      cardName: 'Sleep',
      backgroundUrl: '../../../assets/images/bg6.png',
      innerSvgs: [
        '../../../assets/svg_icons/SleepImpact2.svg',
        // '../../../assets/svg_icons/SleepImpact.svg',
        '../../../assets/svg_icons/SleepInsights.svg',
        '../../../assets/svg_icons/SleepImpactBreakdown.svg',
      ],
      title: 'Get a sleep impact score',
      description: 'Analyze how meals affect Deep Sleep and REM with a predictive Sleep Impact score. Review specific nutrient helpers and disruptors to optimize your nightly rest.'
    },
    {
      cardName: 'Gut',
      backgroundUrl: '../../../assets/images/bg4.png',
      innerSvgs: [
        '../../../assets/svg_icons/GutScore.svg',
        '../../../assets/svg_icons/GutInsights.svg',
      ],
      title: 'Control your gut health',
      description: 'Monitor your Gut Support Score to identify ingredient boosters and disruptors. Track plant diversity and digestion forecasts to improve microbiome health.'
    }
  ];
}
