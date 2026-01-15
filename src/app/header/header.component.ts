import { RouterLink, RouterLinkActive } from '@angular/router';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { HeaderAuthComponent } from '../auth/header-auth/header-auth.component';

import { decodeToPixels, drawCanvas } from '../shared/utils/canvas';
import { data } from '../shared/pictures/JsonPictures';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    HeaderAuthComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('logoCanvas', { static: true })
  logoCanvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    const logoFrame = data['red-mushroom'];
    const pixels = decodeToPixels(logoFrame);
    drawCanvas(this.logoCanvas.nativeElement, pixels, 4);
  }
}
