import { Component } from '@angular/core';
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
    private router: Router
  ) {}

  async submit() {
    this.errorMsg = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { displayName, email, password } = this.form.getRawValue();
    if (!displayName || !email || !password) return;

    this.loading = true;
    try {
      await this.auth.register(email, password, displayName);

      // ✅ redirect to Home after successful registration
      await this.router.navigateByUrl('/');
    }  catch (e: any) {
      console.log('REGISTER ERROR FULL:', e);              // 👈 add
      console.log('REGISTER ERROR CODE:', e?.code);        // 👈 add
      console.log('REGISTER ERROR MESSAGE:', e?.message);  // 👈 add
    
      this.errorMsg = this.humanizeFirebaseError(e?.code) ?? e?.message ?? 'Something went wrong.';
    } finally {
      this.loading = false;
    }
  }

  private humanizeFirebaseError(code?: string): string | null {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'This email is already registered.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/weak-password':
        return 'Password is too weak (min 6 characters).';
      default:
        return null;
    }
  }
}
