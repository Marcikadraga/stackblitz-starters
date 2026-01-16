import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { data } from '../shared/pictures/JsonPictures';
import { decodeToPixels, drawCanvas, Rgba } from '../shared/utils/canvas';

@Component({
  selector: 'app-mushroom-rotate',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div id="mushroom-animation-container" style="width:100%; height:700px; display:grid; place-items:center;">
      <canvas #redMushroom></canvas>
      
      <div id="green-mushroom-container" >
        <canvas id="greenMushroom" #greenMushroom></canvas>
      </div>
    
    

    </div>
  `,
  styleUrls: ['./mushroom-rotate.component.css'],
})
export class MushroomRotateComponent implements AfterViewInit {
  @ViewChild('redMushroom', { static: true }) redMushroom!: ElementRef<HTMLCanvasElement>;
  @ViewChild('greenMushroom', { static: true }) greenMushroom!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    const redPixels = decodeToPixels(data['red-mushroom']);
    const yellowPixels = decodeToPixels(data['green-mushroom']);
  
    const size = 480;
  
    const redCanvas = this.redMushroom.nativeElement;
    redCanvas.width = size;
    redCanvas.height = size;
    drawCanvas(redCanvas, redPixels, 16);
  
    const yellowCanvas = this.greenMushroom.nativeElement;
    yellowCanvas.width = size;
    yellowCanvas.height = size;
    drawCanvas(yellowCanvas, yellowPixels, 3); 
  }
  
}
