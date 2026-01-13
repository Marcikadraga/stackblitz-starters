import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <h2>404 - Page not found</h2>
    <p>The page you are looking for doesn’t exist.</p>

    <a routerLink="/">Go back Home</a>
  `,
})
export class NotFoundComponent {}
