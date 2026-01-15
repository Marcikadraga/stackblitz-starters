import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css',
})
export class AuthPageComponent {
  mode: 'login' | 'register' = 'register';
  loading = false;
  errorMsg = '';

  form = this.fb.group({
    displayName: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  switchMode(m: 'login' | 'register') {
    this.mode = m;
    this.errorMsg = '';
  }

  async submit() {
    this.errorMsg = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { displayName, email, password } = this.form.getRawValue();
    if (!email || !password) return;

    this.loading = true;
    try {
      if (this.mode === 'register') {
        await this.auth.register(email, password, displayName ?? undefined);
      } else {
        await this.auth.login(email, password);
      }
    } catch (e: any) {
      this.errorMsg = this.humanizeFirebaseError(e?.code) ?? 'Something went wrong.';
    } finally {
      this.loading = false;
    }
  }

  guest() {
    this.auth.signInGuest();
  }

  private humanizeFirebaseError(code?: string): string | null {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'This email is already registered.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/weak-password':
        return 'Password is too weak (min 6 characters).';
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Invalid email or password.';
      case 'auth/user-not-found':
        return 'No account found with this email.';
      default:
        return null;
    }
  }
}
