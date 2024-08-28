import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private apiUrl = 'http://127.0.0.1:5000/';
  private eventosEndpoint = 'eventos';
  private asistentesEndpoint = 'asistentes';
  private selectedItem = {};


  constructor(private http: HttpClient) {}

  getAllEventos(): Observable<any> {
    return this.http.get(`${this.apiUrl}${this.eventosEndpoint}`);
  }

  createEvento(evento: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${this.eventosEndpoint}`, evento);
  }

  updateEvento(evento: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${this.eventosEndpoint}/${evento.id}`, evento);
  }

  deleteEvento(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}${this.eventosEndpoint}/${id}`);
  }

  // Asistentes
  getAllAsistentes(): Observable<any> {
    return this.http.get(`${this.apiUrl}${this.asistentesEndpoint}`);
  }

  createAsistente(asistente: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${this.asistentesEndpoint}`, asistente);
  }

  updateAsistente(asistente: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${this.asistentesEndpoint}/${asistente.id}`, asistente);
  }

  deleteAsistente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${this.asistentesEndpoint}/${id}`);
  }

  // Métodos para manejar selección de ítems (eventos o asistentes)
  clicked(item: any) {
    this.selectedItem = item;
  }

  get_clicked() {
    return this.selectedItem;
  }


}
