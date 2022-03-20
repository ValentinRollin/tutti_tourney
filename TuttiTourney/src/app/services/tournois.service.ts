import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tournoi } from '../interfaces/tournoi';

@Injectable({
  providedIn: 'root'
})
export class TournoiService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTournois(): Observable<Tournoi[]>{
    return this.http.get<Tournoi[]>(this.apiUrl+'/tournois');
  }

  getTournoi(name : any): Observable<Tournoi[]>{
    return this.http.get<Tournoi[]>(this.apiUrl + '/tournois/' + name);
  }

  createTournoi(tournoi: Tournoi): Observable<Tournoi>{
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(tournoi);
    console.log(body);
    return this.http.post<Tournoi>(this.apiUrl+'/tournois', body,
    {
      headers: headers,
      });
  }
}
