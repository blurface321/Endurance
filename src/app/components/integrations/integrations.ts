import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Fade } from "../../../directives/fade";

@Component({
  selector: 'app-integrations',
  imports: [
    CommonModule,
    Fade
],
  templateUrl: './integrations.html',
  styleUrl: './integrations.scss',
})
export class Integrations {
  bgSvgs = [
    '../../../assets/svg_icons/AppleHealthLogo.svg',
    '../../../assets/svg_icons/HealthConnectLogo.svg',
    '../../../assets/svg_icons/FitBitLogo.svg',
    '../../../assets/svg_icons/WhoopLogo.svg',
  ]
  mainLogo = '../../../assets/svg_icons/EnduranceLogo.svg'

  repeatArray = new Array(96);

  getSvg(index: number): string {
    return this.bgSvgs[index % this.bgSvgs.length];
  }
}
