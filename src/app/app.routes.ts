import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GamesComponent } from './pages/games/games.component';
import { AboutMeComponent } from './pages/about-me/about-me';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthPageComponent } from './pages/auth/auth-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'games', component: GamesComponent },
  { path: 'about-me', component: AboutMeComponent },
  { path: '**', component: NotFoundComponent },
  { path: 'auth', component: AuthPageComponent },
];
