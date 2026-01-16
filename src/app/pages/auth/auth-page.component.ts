import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css',
})
export class AuthPageComponent {
  loading = false;
  errorMsg = '';

  form = this.fb.group({
    displayName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  async submit() {
    this.errorMsg = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.cdr.detectChanges();
      return;
    }

    const { displayName, email, password } = this.form.getRawValue();
    if (!displayName || !email || !password) return;

    this.loading = true;
    this.cdr.detectChanges(); 

    try {
      await this.auth.register(email, password, displayName);
      await this.router.navigateByUrl('/');

    } catch (e: any) {
      console.log('CATCH RUNNING', e?.code, e?.message);

      this.errorMsg =
        this.humanizeFirebaseError(e?.code) ??
        e?.message ??
        'Something went wrong.';

      this.cdr.detectChanges(); 
    } finally {
      this.loading = false;
      this.cdr.detectChanges(); 

    }
  }

  private humanizeFirebaseError(code?: string): string | null {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'This email is already registered. Try logging in instead.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/weak-password':
        return 'Password is too weak (min 6 characters).';
      case 'auth/operation-not-allowed':
        return 'Email/password sign-in is disabled in Firebase Console. Enable it under Authentication → Sign-in method.';
      default:
        return null;
    }
  }
}
