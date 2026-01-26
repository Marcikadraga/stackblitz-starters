import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, catchError, of } from 'rxjs';
import { UsersService, AppUser } from '../../auth/users.service';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Admin's page</h2>
    <p>Users:</p>

    <ng-container *ngIf="users$ | async as users">
      <div *ngIf="users.length > 0; else noUsers">
        <div *ngFor="let u of users">
          {{ u.displayName }}
        </div>
      </div>

      <ng-template #noUsers>No users yet (or you have no access)</ng-template>
    </ng-container>
  `,
})
export class AdminComponent {
  users$: Observable<AppUser[]> = this.usersService.users$.pipe(
    catchError((err) => {
      console.error('Firestore users read failed:', err);
      return of([] as AppUser[]);
    })
  );

  constructor(private usersService: UsersService) {}
}
