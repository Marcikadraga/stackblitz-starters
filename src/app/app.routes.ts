import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DogsComponent } from './pages/dogs/dogs.component';
import { CatsComponent } from './pages/cats/cats.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dogs', component: DogsComponent },
  { path: 'cats', component: CatsComponent },
  { path: '**', component: NotFoundComponent },
];
