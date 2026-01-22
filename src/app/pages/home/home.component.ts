import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MushroomRotateComponent } from '../../animations/mushroom-rotate.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MushroomRotateComponent],
  template: `
    <div class="home">
      <app-mushroom-rotate class="bg-anim"></app-mushroom-rotate>

      <div id="slogan">
        <p>Powered by NPKK.</p>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}

