import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evenement } from '../interfaces/evenement';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Evenement[]>{
    return this.http.get<Evenement[]>(this.apiUrl+'/events');
  }

  getEvent(name : string): Observable<Evenement>{
    return this.http.get<Evenement>(this.apiUrl + '/events' + name);
  }

  createEvent(event: Evenement): Observable<Evenement>{
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(event);
    console.log(body);
    return this.http.post<Evenement>(this.apiUrl+'/events', body,
    {
      headers: headers,
      });
  }

}
