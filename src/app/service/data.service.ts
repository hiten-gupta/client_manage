import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Client {
  id: number;
  name: string;
  email?: string;
  company?: string;
}

export interface Meeting {
  id?: number;
  clientId?: number;
  title: string;
  date: string;
  time: string;
  clientName?: string; // optional helper
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // change this if your backend runs on different host/port
  private apiUrl = 'http://localhost:3000/api';

  // in-memory meetings
  private _meetings: Meeting[] = [];

  constructor(private http: HttpClient) {}

  // ---------- CLIENTS (backend) ----------
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/clients`);
  }

  addClient(client: Omit<Client, 'id'>): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/clients`, client);
  }

  // ---------- MEETINGS (in-memory) ----------
  get meetings(): Meeting[] {
    return this._meetings;
  }

  addMeeting(m: Meeting): void {
    // attach an id for convenience (not persisted)
    m.id = (this._meetings.length ? (this._meetings[0].id ?? 0) + 1 : 1);
    // put latest first
    this._meetings.unshift(m);
  }
}
