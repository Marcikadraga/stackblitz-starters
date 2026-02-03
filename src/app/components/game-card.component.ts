import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent {
  @Input() name!: string;
  @Input() creator!: string;
  @Input() description!: string;
  @Input() created_at!: Date;

  @Output() clickOnGame = new EventEmitter<void>();

  onClick(): void {
    this.clickOnGame.emit();
  }
}
