import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { IntroComponent } from './intro/intro.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, IntroComponent, HeaderComponent, RouterOutlet],
  styleUrls: ['./app.component.css'],
  template: `
    <app-intro *ngIf="showIntro" (done)="onIntroDone()"></app-intro>

    <div class="app-shell" *ngIf="!showIntro">
    <app-header></app-header>
    <main class="page">
      <router-outlet></router-outlet>
    </main>
  </div>
  `,
})
export class AppComponent {
  showIntro = true;

  onIntroDone(): void {
    this.showIntro = false;
  }
}
