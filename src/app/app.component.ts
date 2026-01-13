import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { IntroComponent } from './intro/intro.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, IntroComponent, HeaderComponent, RouterOutlet],
  template: `
    <app-intro *ngIf="showIntro" (done)="onIntroDone()"></app-intro>

    <ng-container *ngIf="!showIntro">
      <app-header></app-header>
      <main style="padding:16px">
        <router-outlet></router-outlet>
      </main>
    </ng-container>
  `,
})
export class AppComponent {
  showIntro = true;

  onIntroDone(): void {
    this.showIntro = false;
  }
}
