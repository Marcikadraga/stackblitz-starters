import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-guest-auth',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './guest-auth.component.html',
  styleUrl: './guest-auth.component.css',
})
export class GuestAuthComponent {
  user$ = this.auth.user$;

  constructor(private auth: AuthService) {}

  login() {
    this.auth.signInGuest();
  }

  logout() {
    this.auth.logout();
  }
}
