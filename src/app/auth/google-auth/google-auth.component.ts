import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-google-auth',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './google-auth.component.html',
  styleUrl: './google-auth.component.css',
})
export class GoogleAuthComponent implements AfterViewInit {
  @ViewChild('btn', { static: true }) btnRef!: ElementRef<HTMLElement>;
  user$ = this.auth.user$;

  constructor(private auth: AuthService) {}

  async ngAfterViewInit() {
    await this.auth.initGIS();
    this.auth.renderGoogleButton(this.btnRef.nativeElement);
  }

  guest() {
    this.auth.signInGuest();
  }

  logout() {
    this.auth.logout();
  }
}
