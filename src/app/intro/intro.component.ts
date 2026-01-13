import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DinoIntroComponent } from './dino-intro.component';
import { LoadingDotsComponent } from './loading-dots.component';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [CommonModule, DinoIntroComponent, LoadingDotsComponent],
  template: `
    <div style="padding:16px; display:flex; justify-content:center;">
      <div>
        <app-dino-intro></app-dino-intro>
        <app-loading-dots></app-loading-dots>
      </div>
    </div>
  `,
})
export class IntroComponent implements OnInit, OnDestroy {
  @Output() done = new EventEmitter<void>();

  private timeoutId: number | undefined;

  ngOnInit(): void {
    this.timeoutId = window.setTimeout(() => {
      this.done.emit();
    }, 3000);
  }

  ngOnDestroy(): void {
    if (this.timeoutId !== undefined) {
      window.clearTimeout(this.timeoutId);
    }
  }
}
