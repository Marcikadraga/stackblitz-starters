import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { GameCardComponent } from '../../components/game-card.component';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, GameCardComponent],
  templateUrl: 'games.component.html',
  styleUrls: ['games.component.scss'],
})
export class GamesComponent {
  games = toSignal(this.gameService.games$, { initialValue: [] });

  gamesCount = computed(() => this.games().length);

  constructor(private gameService: GameService) {}

  openGame(gameName: string): void {
    console.log('Clicked game:', gameName);
  }
}
