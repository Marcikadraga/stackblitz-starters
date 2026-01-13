import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';

import { data } from '../shared/pictures/JsonPictures';
import { decodeToPixels, drawCanvas } from '../shared/utils/canvas';

@Component({
  selector: 'app-dino-intro',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding:16px">
      <div style="position:relative; width:240px; height:240px">
        <canvas #c1 style="position:absolute; inset:0; border:1px solid #ddd; background:#eee;"></canvas>
        <canvas #c2 style="position:absolute; inset:0; border:1px solid #ddd; background:#eee;"></canvas>
      </div>
    </div>
  `,
})
export class DinoIntroComponent implements AfterViewInit {
  @ViewChild('c1') c1!: ElementRef<HTMLCanvasElement>;
  @ViewChild('c2') c2!: ElementRef<HTMLCanvasElement>;

  @Output() done = new EventEmitter<void>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    const pixels1 = decodeToPixels(data['dino-run_right_right_up']);
    const pixels2 = decodeToPixels(data['dino-run_right_left_up']);

    const canvas1 = this.c1.nativeElement;
    const canvas2 = this.c2.nativeElement;

    const fps = 10;
    const durationMs = 3000;
    const pixelSize = 8;
    const canvasSizePx = 240;

    // Initial state (hide by width/height)
    canvas1.style.width = `${canvasSizePx}px`;
    canvas1.style.height = `${canvasSizePx}px`;
    canvas2.style.width = `0px`;
    canvas2.style.height = `0px`;

    let toggle = false;
    let useFirstFrame = true;

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
      this.done.emit();      //tell parent we’re finished
      this.cdr.detectChanges();
    }, durationMs);
  }
}
