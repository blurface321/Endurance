import { Component } from '@angular/core';

@Component({
  selector: 'app-gut-health',
  imports: [],
  templateUrl: './gut-health.html',
  styleUrl: './gut-health.scss',
})
export class GutHealth {
  phrases: string[] = [
    "On which days did I miss my fiber goals?",
    "What were my top gut boosters in the past week?",
    "Which days had the best prebiotic alignment?",
    "Did last night's meal spike my gut inflammation score?"
  ]
}
