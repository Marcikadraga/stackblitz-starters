import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MOCK_GAMES } from '../shared/data/mock-games';

@Injectable({ providedIn: 'root' })
export class GameService {
  private gamesSubject = new BehaviorSubject(MOCK_GAMES);

  games$ = this.gamesSubject.asObservable();
}
