import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public showDropDown: boolean = false

  onMouseEnter(){
    this.showDropDown = !this.showDropDown
  }

  onMouseLeave(){
    this.showDropDown = !this.showDropDown
  }
}
