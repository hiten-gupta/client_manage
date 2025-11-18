import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService, Meeting } from '../service/data.service';

@Component({
  selector: 'app-meetings-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div>
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium">Meetings</h3>
        <a routerLink="/dashboard/meetings/new"
           class="text-sm bg-blue-600 text-white px-3 py-1 rounded">
           Schedule
        </a>
      </div>

      <div *ngIf="data.meetings.length === 0" class="bg-white p-4 rounded shadow-sm">
        <p class="text-sm text-gray-600">No meetings yet.</p>
      </div>

      <div *ngIf="data.meetings.length > 0" class="space-y-3">
        <div *ngFor="let m of data.meetings" class="bg-white p-3 rounded shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium">{{ m.title }}</div>
              <div class="text-sm text-gray-500">
                {{ m.date }} {{ m.time }}
              </div>
              <div class="text-sm text-gray-700" *ngIf="m.clientName">
                Client: {{ m.clientName }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class MeetingsListComponent {

  constructor(public data: DataService) {}
}
