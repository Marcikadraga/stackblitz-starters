import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <button (click)="increment()">+</button>
    <p>Count: {{ count() }}</p>
    <p>Double: {{ doubleCount() }}</p>
  `,
})
export class GamesComponent {
  count = signal(1);

  doubleCount = () => {
    console.log('function recalculated');
    return this.count() * 2;
  };

  increment() {
    this.count.update(c => c + 1);
  }
}

