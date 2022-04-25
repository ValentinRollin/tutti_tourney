import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Match } from '../interfaces/match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addMatchs(matchs: Match[], nomEvenement: any, nomTournoi: any, numeroTour:any, numeroPoule: any ): Observable<Match[]>{
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(matchs);
    console.log(body);
    return this.http.put<Match[]>(this.apiUrl+'/evenements/'+nomEvenement+'/'+nomTournoi + '/'+numeroTour + '/' + numeroPoule + '/matchs', body,
    {
      headers: headers,
      });
  }

  updateMatchs(matchs: Match, nomEvenement: any, nomTournoi: any, numeroTour:any, numeroPoule: any ): Observable<Match>{
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(matchs);
    console.log(body);
    return this.http.put<Match>(this.apiUrl+'/evenements/'+nomEvenement+'/'+nomTournoi + '/'+numeroTour + '/' + numeroPoule + '/matchs' + '/update', body,
    {
      headers: headers,
      });
  }

  getMatchs(nomEvenement:any, nomTournoi:any, numeroTour: any, numeroPoule: any ): Observable<Match[]>{
    return this.http.get<Match[]>(this.apiUrl+'/evenements/'+nomEvenement+'/'+nomTournoi + '/' + numeroTour + '/' + numeroPoule +  '/matchs');
  }

}
