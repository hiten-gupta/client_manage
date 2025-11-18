import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DataService, Client } from 'app/service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meeting-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-md mx-auto">
      <h3 class="text-lg font-medium mb-4">Schedule Meeting</h3>
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4 bg-white p-4 rounded">
        <div>
          <label class="block text-sm text-gray-700">Client</label>
          <select formControlName="clientId" class="w-full border p-2 rounded">
            <option value="">-- Select Client --</option>
            <option *ngFor="let c of clients" [value]="c.id">{{ c.name }} {{ c.company ? '(' + c.company + ')' : '' }}</option>
          </select>
          <div *ngIf="form.get('clientId')?.invalid && form.get('clientId')?.touched" class="text-red-600 text-sm mt-1">
            Client is required
          </div>
        </div>

        <div>
          <label class="block text-sm text-gray-700">Title</label>
          <input formControlName="title" class="w-full border p-2 rounded" />
        </div>

        <div>
          <label class="block text-sm text-gray-700">Date</label>
          <input type="date" formControlName="date" class="w-full border p-2 rounded" />
        </div>

        <div>
          <label class="block text-sm text-gray-700">Time</label>
          <input type="time" formControlName="time" class="w-full border p-2 rounded" />
        </div>

        <div class="flex gap-2">
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Schedule</button>
          <button type="button" (click)="cancel()" class="px-4 py-2 bg-gray-200 rounded">Cancel</button>
        </div>
      </form>
    </div>
  `
})
export class MeetingFormComponent implements OnInit {
  form!: FormGroup;
  clients: Client[] = [];

  constructor(private fb: FormBuilder, private data: DataService, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      clientId: ['', Validators.required],
      title: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });

    // load clients so user can pick one
    this.data.getClients().subscribe({
      next: (res) => this.clients = res,
      error: (err) => console.error('Failed loading clients', err)
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.value;
    // find client name for UI-only convenience
    const client = this.clients.find(c => c.id === Number(v.clientId));
    const clientName = client ? client.name : undefined;

    this.data.addMeeting({
      clientId: Number(v.clientId),
      title: v.title,
      date: v.date,
      time: v.time,
      clientName
    });

    this.router.navigate(['/dashboard/meetings']);
  }

  cancel(): void {
    this.router.navigate(['/dashboard/meetings']);
  }
}
