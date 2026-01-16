import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
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

  constructor(private auth: AuthService, private router: Router) {}

  async guest() {
    try {
      await this.auth.signInGuest();     
      await this.router.navigateByUrl('/');
    } catch (e) {
      console.error(e);
    }
  }

  async logout() {
    try {
      await this.auth.logout();
      await this.router.navigateByUrl('/');
    } catch (e) {
      console.error(e);
    }
  }
}
