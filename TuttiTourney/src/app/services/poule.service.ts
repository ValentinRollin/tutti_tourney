import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Poule } from '../interfaces/poule';

@Injectable({
  providedIn: 'root'
})
export class PouleService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPoules(nomEvenement:any, nomTournoi:any, numeroTour: any): Observable<Poule[]>{
    return this.http.get<Poule[]>(this.apiUrl+'/evenements/'+nomEvenement+'/'+nomTournoi + '/' + numeroTour +  '/poules');
  }


  addPoule(poule: Poule, nomEvenement: any, nomTournoi: any, numeroTour: any): Observable<Poule>{
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(poule);
    console.log(body);
    return this.http.put<Poule>(this.apiUrl+'/evenements/'+nomEvenement+'/'+nomTournoi + '/' + numeroTour +  '/poules', body,
    {
      headers: headers,
      });
  }

  updatePoule(poule: Poule[], nomEvenement: any, nomTournoi: any, numeroTour: any): Observable<Poule>{
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(poule);
    console.log(body);
    return this.http.put<Poule>(this.apiUrl+'/evenements/'+nomEvenement+'/'+nomTournoi + '/' + numeroTour + '/poules/update', body,
    {
      headers: headers,
      });
  }
}
