import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { DinoIntroComponent } from './intro/dino-intro.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DinoIntroComponent, HeaderComponent, RouterOutlet],
  template: `
    <app-dino-intro *ngIf="showIntro" (done)="onIntroDone()"></app-dino-intro>
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
