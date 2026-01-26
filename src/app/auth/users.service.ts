import { Injectable } from '@angular/core';
import { collection, onSnapshot } from 'firebase/firestore';
import { Observable, shareReplay } from 'rxjs';
import { db } from './firebase'; // keep your path

export type AppUser = {
  uid: string;
  displayName?: string;
  email?: string;
  isAnonymous?: boolean;
};

@Injectable({ providedIn: 'root' })
export class UsersService {
  readonly users$: Observable<AppUser[]> = new Observable<AppUser[]>((observer) => {
    const colRef = collection(db, 'users');

    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        const users: AppUser[] = snapshot.docs.map((d) => ({
          uid: d.id,
          ...(d.data() as Omit<AppUser, 'uid'>),
        }));

        observer.next(
          users
            .filter((u) => !!u.displayName && u.displayName.trim().length > 0)
            .sort((a, b) => (a.displayName ?? '').localeCompare(b.displayName ?? ''))
        );
      },
      (err) => observer.error(err)
    );

    return () => unsubscribe();
  }).pipe(
    // keeps last value + avoids multiple listeners
    shareReplay({ bufferSize: 1, refCount: true })
  );
}
