import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService, Client } from '../../service/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div>
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium">Clients</h3>
        <a routerLink="/dashboard/clients/new" class="text-sm bg-blue-600 text-white px-3 py-1 rounded">Add Client</a>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <thead class="bg-gray-50">
            <tr>
              <th class="p-3 text-left text-sm text-gray-600">Name</th>
              <th class="p-3 text-left text-sm text-gray-600">Email</th>
              <th class="p-3 text-left text-sm text-gray-600">Company</th>
              <th class="p-3 text-left text-sm text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let c of clients$ | async" class="border-t">
              <td class="p-3 text-sm">{{c.name}}</td>
              <td class="p-3 text-sm">{{c.email}}</td>
              <td class="p-3 text-sm">{{c.company}}</td>
              <td class="p-3 text-sm">
                <a [routerLink]="['/dashboard/clients', c.id, 'edit']" class="text-blue-600">Edit</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class ClientsListComponent {
  clients$: Observable<Client[]>;

  constructor(private data: DataService) {
    this.clients$ = this.data.getClients();
  }
}
