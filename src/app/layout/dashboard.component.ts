import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  template: `
    <div class="flex">
      <app-sidebar></app-sidebar>
      <main class="flex-1 p-6">
        <div class="max-w-7xl mx-auto">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-semibold text-gray-800">Dashboard</h2>
            <div class="text-sm text-gray-500">Welcome back</div>
          </div>
          <div class="grid grid-cols-3 gap-4 mb-6">
            <div class="bg-white p-4 rounded shadow-sm"> <div class="text-sm text-gray-500">Clients</div><div class="text-2xl font-bold">12</div></div>
            <div class="bg-white p-4 rounded shadow-sm"> <div class="text-sm text-gray-500">Meetings</div><div class="text-2xl font-bold">3</div></div>
            <div class="bg-white p-4 rounded shadow-sm"> <div class="text-sm text-gray-500">Active Users</div><div class="text-2xl font-bold">4</div></div>
          </div>
          <section class="bg-white p-4 rounded shadow-sm">
            <router-outlet></router-outlet>
          </section>
        </div>
      </main>
    </div>
  `
})
export class DashboardComponent {}
