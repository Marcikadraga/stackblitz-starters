import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth,db } from './firebase';
import { GoogleUser } from './auth.types';
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

  async register(email: string, password: string, displayName: string): Promise<void> {
    const cleanName = displayName.trim();
    console.log('REGISTER: start', { email });
  
    if (auth.currentUser?.isAnonymous) {
      console.log('REGISTER: guest detected, linking...');
      const cred = EmailAuthProvider.credential(email, password);
  
      const linked = await linkWithCredential(auth.currentUser, cred);
      console.log('REGISTER: linked', linked.user.uid);
  
      await updateProfile(linked.user, { displayName: cleanName });
      console.log('REGISTER: profile updated');
  
      await setDoc(
        doc(db, 'users', linked.user.uid),
        {
          uid: linked.user.uid,
          email: linked.user.email,
          displayName: cleanName,
          isAnonymous: false,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      console.log('REGISTER: firestore saved');
  
      return;
    }
  
    console.log('REGISTER: normal createUser...');
    const res = await createUserWithEmailAndPassword(auth, email, password);
    console.log('REGISTER: created', res.user.uid);
  
    await updateProfile(res.user, { displayName: cleanName });
    console.log('REGISTER: profile updated');
  
    await setDoc(
      doc(db, 'users', res.user.uid),
      {
        uid: res.user.uid,
        email: res.user.email,
        displayName: cleanName,
        isAnonymous: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    console.log('REGISTER: firestore saved');
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
      name: u.displayName ?? (u.isAnonymous ? 'Guest' : u.email ?? 'User'),
      picture: u.photoURL ?? undefined,
    };
  }
}
