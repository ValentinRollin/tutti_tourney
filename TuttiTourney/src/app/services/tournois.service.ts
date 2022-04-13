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

  getTournois(nomEvenement : any): Observable<Tournoi[]>{
    return this.http.get<Tournoi[]>(this.apiUrl+'/'+ nomEvenement +'/tournois');
  }

  //PAS MIS A JOUR {
  getTournoi(nomEvenement : any, nomTournoi : any): Observable<Tournoi>{
    return this.http.get<Tournoi>(this.apiUrl + '/evenements/' + nomEvenement + '/' + nomTournoi);
  }
  //PAS MIS A JOUR }

  addTournoi(tournoi: Tournoi, nomEvenement : any): Observable<Tournoi>{
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(tournoi);
    console.log(body);
    console.log(nomEvenement);
    return this.http.put<Tournoi>(this.apiUrl+'/evenements/'+nomEvenement, body,
    {
      headers: headers,
      });
  }

  updateTournoi(tournoi:Tournoi, nomTournoi: any, nomEvenement: any): Observable<Tournoi>{
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(tournoi);
    console.log(body);
    return this.http.put<Tournoi>(this.apiUrl+'/evenements/'+nomEvenement+'/'+nomTournoi+'/updateEtat', body,
    {
      headers: headers,
      });
  }
}
