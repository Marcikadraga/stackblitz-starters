import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GamesComponent } from './pages/games/games.component';
import { CatsComponent } from './pages/cats/cats.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'games', component: GamesComponent },
  { path: 'cats', component: CatsComponent },
  { path: '**', component: NotFoundComponent },
];
