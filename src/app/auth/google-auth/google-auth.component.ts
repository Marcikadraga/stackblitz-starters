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
    await this.auth.init();

    // extra safety (should exist now anyway)
    const el = this.btnRef?.nativeElement;
    if (!el) return;

    this.auth.renderButton(el);
  }

  signOut() {
    this.auth.signOut();
  }
}
