import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="w-64 bg-white border-r min-h-screen p-6">
      <div class="mb-8">
        <h1 class="text-lg font-bold text-gray-900">Client Manager</h1>
      </div>
      <nav class="space-y-2 text-sm">
        <a routerLink="/dashboard" class="block p-2 rounded hover:bg-gray-100">Dashboard</a>
        <a routerLink="/dashboard/clients" class="block p-2 rounded hover:bg-gray-100">Clients</a>
        <a routerLink="/dashboard/meetings" class="block p-2 rounded hover:bg-gray-100">Meetings</a>
      </nav>
    </aside>
  `
})
export class SidebarComponent {}
