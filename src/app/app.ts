import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { filter } from 'rxjs';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('Endurance');

  private router = inject(Router)
  private viewPortScrolling = inject(ViewportScroller)

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const scrollContainer = document.getElementById('main-scroll-container');

      if(scrollContainer) {
        scrollContainer.style.scrollBehavior = 'auto'
        scrollContainer.scrollTop = 0;
        scrollContainer.scrollTo({ top: 0, left: 0, behavior: 'instant'});

        setTimeout(() => {
          scrollContainer.style.scrollBehavior = 'smooth';
        }, 50);
      }

      window.scrollTo({ top: 0, behavior: 'instant'})
    });
  }
}
