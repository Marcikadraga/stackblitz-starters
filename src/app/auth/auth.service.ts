import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  onAuthStateChanged,
  signInAnonymously,
  signOut,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  linkWithCredential,
  EmailAuthProvider,
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

  // Guest
  async signInGuest(): Promise<void> {
    await signInAnonymously(auth);
  }

  // Register new account
  async register(email: string, password: string, displayName?: string): Promise<void> {
    // If user is currently Guest, link guest -> email/password (keeps progress)
    if (auth.currentUser?.isAnonymous) {
      const cred = EmailAuthProvider.credential(email, password);
      await linkWithCredential(auth.currentUser, cred);

      if (displayName?.trim()) {
        await updateProfile(auth.currentUser, { displayName: displayName.trim() });
      }
      return;
    }

    const res = await createUserWithEmailAndPassword(auth, email, password);

    if (displayName?.trim()) {
      await updateProfile(res.user, { displayName: displayName.trim() });
    }
  }

  // Login existing account
  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async logout(): Promise<void> {
    await signOut(auth);
  }

  private mapUser(u: User | null): GoogleUser | null {
    if (!u) return null;

    return {
      sub: u.uid,
      email: u.email ?? undefined,
      name: u.displayName ?? (u.isAnonymous ? 'Guest' : undefined),
      picture: u.photoURL ?? undefined,
    };
  }
}
