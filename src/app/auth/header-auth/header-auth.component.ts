import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header-auth',
  standalone: true,
  imports: [NgIf, AsyncPipe, RouterLink],
  templateUrl: './header-auth.component.html',
  styleUrl: './header-auth.component.css',
})
export class HeaderAuthComponent {
  user$ = this.auth.user$;

  constructor(private auth: AuthService) {}

  guest() {
    this.auth.signInGuest();
  }

  logout() {
    this.auth.logout();
  }
}

