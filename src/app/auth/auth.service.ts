import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  onAuthStateChanged,
  signInAnonymously,
  signOut,
  User,
} from 'firebase/auth';

import { auth } from './firebase';
import { GoogleUser } from './auth.types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<GoogleUser | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    onAuthStateChanged(auth, (u) => {
      this.userSubject.next(this.mapUser(u));
    });
  }

  async signInGuest(): Promise<void> {
    await signInAnonymously(auth);
  }

  async logout(): Promise<void> {
    await signOut(auth);
  }

  private mapUser(u: User | null): GoogleUser | null {
    if (!u) return null;

    return {
      sub: u.uid,
      name: 'Guest',
    };
  }
}
