import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';

import { drawCanvas, decodeToPixels } from './shared/utils/canvas';
import { data } from './shared/pictures/JsonPictures';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterOutlet],
  template: `
    
    <div *ngIf="showIntro" style="padding:16px">
      <div style="position:relative; width:240px; height:240px">
        <canvas #c1 style="position:absolute; inset:0; border:1px solid #ddd; background:#eee;"></canvas>
        <canvas #c2 style="position:absolute; inset:0; border:1px solid #ddd; background:#eee;"></canvas>
      </div>
    </div>

    

    <ng-container *ngIf="!showIntro">
      <app-header></app-header>
      <main style="padding:16px">
        <router-outlet></router-outlet>
      </main>
    </ng-container>
  `,
})
export class AppComponent implements AfterViewInit {
  @ViewChild('c1') c1!: ElementRef<HTMLCanvasElement>;
  @ViewChild('c2') c2!: ElementRef<HTMLCanvasElement>;

  showIntro = true;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    const pixels1 = decodeToPixels(data['dino-run_right_right_up']);
    const pixels2 = decodeToPixels(data['dino-run_right_left_up']);

    const canvas1 = this.c1.nativeElement;
    const canvas2 = this.c2.nativeElement;

    const fps = 7;
    const durationMs = 3000;
    const pixelSize = 8;
    const canvasSizePx = 240;

    let toggle = false;
    let useFirstFrame = true;

    // Initial state
    canvas1.style.width = `${canvasSizePx}px`;
    canvas1.style.height = `${canvasSizePx}px`;

    canvas2.style.width = `0px`;
    canvas2.style.height = `0px`;

    const intervalId = window.setInterval(() => {
      const currentPixels = useFirstFrame ? pixels1 : pixels2;
      useFirstFrame = !useFirstFrame;

      toggle = !toggle;

      if (toggle) {
        drawCanvas(canvas1, currentPixels, pixelSize);

        canvas1.style.width = `${canvasSizePx}px`;
        canvas1.style.height = `${canvasSizePx}px`;

        canvas2.style.width = `0px`;
        canvas2.style.height = `0px`;
      } else {
        drawCanvas(canvas2, currentPixels, pixelSize);

        canvas2.style.width = `${canvasSizePx}px`;
        canvas2.style.height = `${canvasSizePx}px`;

        canvas1.style.width = `0px`;
        canvas1.style.height = `0px`;
      }
    }, Math.round(1000 / fps));

    window.setTimeout(() => {
      window.clearInterval(intervalId);
      this.showIntro = false;
      this.cdr.detectChanges();
    }, durationMs);
  }
}
