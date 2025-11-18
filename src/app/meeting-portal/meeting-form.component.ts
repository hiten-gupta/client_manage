import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'app/service/data.service';

@Component({
  selector: 'app-meeting-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-md mx-auto">
      <h3 class="text-lg font-medium mb-4">Schedule Meeting</h3>
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4 bg-white p-4 rounded">
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
export class MeetingFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private data: DataService, private router: Router) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.value;
    this.data.addMeeting({ title: v.title!, date: v.date!, time: v.time! });
    this.router.navigate(['/dashboard/meetings']);
  }

  cancel() {
    this.router.navigate(['/dashboard/meetings']);
  }
}

