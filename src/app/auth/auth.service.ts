import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ScriptLoaderService } from '../shared/utils/script-loader.service';
import { GoogleUser } from './auth.types';

declare global {
  interface Window {
    google?: any;
  }
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly GIS_SRC = 'https://accounts.google.com/gsi/client';

  // TODO: replace with your real client id
  private readonly clientId = 'YOUR_GOOGLE_CLIENT_ID';

  private initialized = false;

  private userSubject = new BehaviorSubject<GoogleUser | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private scripts: ScriptLoaderService) {}

  async init(): Promise<void> {
    if (this.initialized) return;

    await this.scripts.load(this.GIS_SRC);

    if (!window.google?.accounts?.id) {
      throw new Error('Google Identity Services not available on window.google');
    }

    window.google.accounts.id.initialize({
      client_id: this.clientId,

      // small popup UX (not full-page redirect)
      ux_mode: 'popup',

      // popup mode returns JWT in credential field
      callback: (resp: { credential?: string }) => {
        const jwt = resp?.credential;
        if (!jwt) return;

        const user = this.decodeIdToken(jwt);
        this.userSubject.next(user);

        // In a real app, send `jwt` to your backend for verification & session creation.
      },
    });

    this.initialized = true;
  }

  /** Used by the component to render the official Google button */
  renderButton(container: HTMLElement): void {
    window.google.accounts.id.renderButton(container, {
      theme: 'outline',
      size: 'medium',
      text: 'signin_with',
      shape: 'pill',
    });
  }

  /** Optional: show One Tap prompt (you can skip if you only want the button) */
  promptOneTap(): void {
    window.google.accounts.id.prompt();
  }

  signOut(): void {
    const user = this.userSubject.value;
    this.userSubject.next(null);

    // disable auto-select so it doesn't instantly sign in again
    window.google?.accounts?.id?.disableAutoSelect?.();

    // optional: revoke consent for this user (requires email/sub + active Google session)
    if (user?.email) {
      window.google?.accounts?.id?.revoke?.(user.email, () => {});
    }
  }

  private decodeIdToken(jwt: string): GoogleUser {
    // WARNING: decoding != verifying. Verify on backend for real security.
    const payload = jwt.split('.')[1];
    const json = decodeURIComponent(
      atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const data = JSON.parse(json);

    return {
      sub: data.sub,
      email: data.email,
      name: data.name,
      picture: data.picture,
    };
  }
}
