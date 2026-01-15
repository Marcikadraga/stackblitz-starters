import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ScriptLoaderService } from '../shared/utils/script-loader.service';
import { GoogleUser } from './auth.types';

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInAnonymously,
  signInWithCredential,
  signOut,
  linkWithCredential,
  User,
} from 'firebase/auth';

import { auth } from './firebase';

declare global {
  interface Window {
    google?: any;
  }
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly GIS_SRC = 'https://accounts.google.com/gsi/client';

  // Must be the OAuth Web Client ID from Google Cloud Console
  private readonly clientId = 'YOUR_GOOGLE_CLIENT_ID';

  private initialized = false;
  private pendingIdToken: string | null = null;

  private userSubject = new BehaviorSubject<GoogleUser | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private scripts: ScriptLoaderService) {
    // Keep app state synced with Firebase session
    onAuthStateChanged(auth, (u) => this.userSubject.next(this.mapFirebaseUser(u)));
  }

  async initGIS(): Promise<void> {
    if (this.initialized) return;

    await this.scripts.load(this.GIS_SRC);

    if (!window.google?.accounts?.id) {
      throw new Error('Google Identity Services not available.');
    }

    window.google.accounts.id.initialize({
      client_id: this.clientId,
      ux_mode: 'popup', // small popup UX :contentReference[oaicite:2]{index=2}
      callback: async (resp: { credential?: string }) => {
        const idToken = resp?.credential;
        if (!idToken) return;

        // If user is anonymous, we’ll link instead of replacing the account
        const current = auth.currentUser;
        if (current?.isAnonymous) {
          await this.linkAnonymousWithGoogle(idToken);
        } else {
          await this.signInWithGoogleIdToken(idToken);
        }
      },
    });

    this.initialized = true;
  }

  renderGoogleButton(container: HTMLElement): void {
    window.google.accounts.id.renderButton(container, {
      theme: 'outline',
      size: 'medium',
      text: 'signin_with',
      shape: 'pill',
    });
  }

  async signInGuest(): Promise<void> {
    await signInAnonymously(auth); // guest sign-in :contentReference[oaicite:3]{index=3}
  }

  async signInWithGoogleIdToken(idToken: string): Promise<void> {
    const credential = GoogleAuthProvider.credential(idToken);
    await signInWithCredential(auth, credential); // :contentReference[oaicite:4]{index=4}
  }

  async linkAnonymousWithGoogle(idToken: string): Promise<void> {
    const user = auth.currentUser;
    if (!user) return;

    const credential = GoogleAuthProvider.credential(idToken);
    await linkWithCredential(user, credential); // links guest -> Google :contentReference[oaicite:5]{index=5}
  }

  async logout(): Promise<void> {
    // prevents auto reselect in GIS
    window.google?.accounts?.id?.disableAutoSelect?.();
    await signOut(auth);
  }

  private mapFirebaseUser(u: User | null): GoogleUser | null {
    if (!u) return null;

    return {
      sub: u.uid,
      email: u.email ?? undefined,
      name: u.displayName ?? (u.isAnonymous ? 'Guest' : undefined),
      picture: u.photoURL ?? undefined,
    };
  }
}
