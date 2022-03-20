import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evenement } from '../interfaces/evenement';
import { environment } from 'src/environments/environment';
import { Tournoi } from '../interfaces/tournoi';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getEvenements(): Observable<Evenement[]>{
    return this.http.get<Evenement[]>(this.apiUrl+'/evenements');
  }

  getEvenement(name : string): Observable<Evenement>{
    return this.http.get<Evenement>(this.apiUrl + '/evenements' + name);
  }

  createEvenement(evenement: Evenement): Observable<Evenement>{
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(evenement);
    console.log(body);
    return this.http.post<Evenement>(this.apiUrl+'/evenements', body,
    {
      headers: headers,
      });
  }

  updateEvenement(nomEvenement: String, tournoi:Tournoi): Observable<Evenement>{
    const headers = { 'content-type': 'application/json' };
    const path = nomEvenement;
    //console.log(evenement)
    const body = JSON.stringify(tournoi);
    console.log(body);
    return this.http.put<Evenement>(this.apiUrl+'/evenements/'+path, body,
    {
      headers: headers,
      });
  }

}
