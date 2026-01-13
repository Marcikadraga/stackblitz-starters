import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { data } from '../shared/pictures/JsonPictures';
import { decodeToPixels, drawCanvas, Rgba } from '../shared/utils/canvas';

@Component({
  selector: 'app-mushroom-rotate',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="width:100%; height:700px; display:grid; place-items:center;">
    <canvas #c></canvas>

    </div>
  `,
  styleUrls: ['./mushroom-rotate.component.css'],
})
export class MushroomRotateComponent implements AfterViewInit {
  @ViewChild('c', { static: true }) c!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    const pixels = decodeToPixels(data['red-mushroom']);
    const canvas = this.c.nativeElement;
  
    const size = 480;
    canvas.width = size;
    canvas.height = size;
  
    drawCanvas(canvas, pixels, 16); // larger pixelSize = nicer look
  }
  
}
