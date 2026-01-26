import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GamesComponent } from './pages/games/games.component';
import { AboutMeComponent } from './pages/about-me/about-me';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthPageComponent } from './pages/auth/auth-page.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'games', component: GamesComponent },
  { path: 'about-me', component: AboutMeComponent },
  { path: 'auth', component: AuthPageComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', component: NotFoundComponent },
];
