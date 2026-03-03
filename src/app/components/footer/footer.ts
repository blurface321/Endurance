import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [
    RouterModule
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  submitEmail(email: string) {
    console.log('Email submitted:', email);
  }
}
