import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService, Client } from '../../service/data.service';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-xl mx-auto">
      <h3 class="text-lg font-medium mb-4">Client Form</h3>
      <form [formGroup]="clientForm" (ngSubmit)="onSubmit()" class="space-y-4 bg-white p-4 rounded">
        <div>
          <label class="block text-sm text-gray-700">Name</label>
          <input formControlName="name" class="w-full border p-2 rounded" />
          <div *ngIf="name?.invalid && name?.touched" class="text-red-600 text-sm mt-1">
            <div *ngIf="name?.errors?.['required']">Name is required</div>
          </div>
        </div>
        <div>
          <label class="block text-sm text-gray-700">Email</label>
          <input formControlName="email" class="w-full border p-2 rounded" />
        </div>
        <div>
          <label class="block text-sm text-gray-700">Company</label>
          <input formControlName="company" class="w-full border p-2 rounded" />
        </div>
        <div class="flex gap-2">
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
          <button type="button" (click)="cancel()" class="px-4 py-2 bg-gray-200 rounded">Cancel</button>
        </div>
      </form>
    </div>
  `
})
export class ClientFormComponent {
  clientForm: FormGroup;

  constructor(private fb: FormBuilder, private data: DataService, private router: Router) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      company: ['']
    });
  }

  get name() { return this.clientForm.get('name'); }

  onSubmit(): void {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }

    const v = this.clientForm.value;
    const client: Omit<Client, 'id'> = {
      name: v.name,
      email: v.email,
      company: v.company
    };

    this.data.addClient(client).subscribe({
      next: () => this.router.navigate(['/dashboard/clients']),
      error: (err) => {
        console.error('Error adding client', err);
        alert('Failed to add client. Check console for details.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/dashboard/clients']);
  }
}
