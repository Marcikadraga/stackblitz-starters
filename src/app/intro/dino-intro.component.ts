import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { data } from '../shared/pictures/JsonPictures';
import { decodeToPixels, drawCanvas } from '../shared/utils/canvas';

@Component({
  selector: 'app-dino-intro',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="position:relative; width:240px; height:240px; margin:0 auto;">
      <canvas #c1 style="position:absolute; inset:0; border:1px solid #ddd; background:#eee;"></canvas>
      <canvas #c2 style="position:absolute; inset:0; border:1px solid #ddd; background:#eee;"></canvas>
    </div>
  `,
})
export class DinoIntroComponent implements AfterViewInit {
  @ViewChild('c1') c1!: ElementRef<HTMLCanvasElement>;
  @ViewChild('c2') c2!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    const pixels1 = decodeToPixels(data['google_dino_left_up']);
    const pixels2 = decodeToPixels(data['google_dino_right_up']);

    const canvas1 = this.c1.nativeElement;
    const canvas2 = this.c2.nativeElement;

    const fps = 10;
    const pixelSize = 8;
    const canvasSizePx = 240;

    canvas1.style.width = `${canvasSizePx}px`;
    canvas1.style.height = `${canvasSizePx}px`;
    canvas2.style.width = `0px`;
    canvas2.style.height = `0px`;

    let toggle = false;
    let useFirstFrame = true;

    window.setInterval(() => {
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
  }
}
