import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Sign in to Client Manager</h2>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input formControlName="email" type="email" class="w-full border border-gray-200 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />
          <div *ngIf="email?.invalid && email?.touched" class="text-red-600 text-sm mt-1">
            <div *ngIf="email?.errors?.['required']">Email is required</div>
            <div *ngIf="email?.errors?.['email']">Enter a valid email</div>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input formControlName="password" type="password" class="w-full border border-gray-200 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />
          <div *ngIf="password?.invalid && password?.touched" class="text-red-600 text-sm mt-1">
            <div *ngIf="password?.errors?.['required']">Password is required</div>
          </div>
        </div>
        <button type="submit" class="w-full py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
          Sign in
        </button>
      </form>
      <div class="mt-4 text-sm text-center text-gray-500">
        For demo: click <a routerLink="/dashboard" class="text-blue-600">Dashboard</a>
      </div>
    </div>
  </div>
  `
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.router.navigate(['/dashboard']);
  }
}
