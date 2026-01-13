import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MushroomRotateComponent } from '../../animations/mushroom-rotate.component';


@Component({
  selector: 'app-home',
  imports: [CommonModule, MushroomRotateComponent],
  template: `
  <div class="home">
  <!-- Background animation -->
  <app-mushroom-rotate class="bg-anim"></app-mushroom-rotate>

  <!-- Foreground content -->
  <div class="content">
    <h1>Welcome</h1>
    <p>This is my home page</p>
  </div>
</div>
  `,
})
export class HomeComponent {}
