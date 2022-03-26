import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Equipe } from '../interfaces/equipe';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getEquipes(nomEvenement:any, nomTournoi:any): Observable<Equipe[]>{
    return this.http.get<Equipe[]>(this.apiUrl+'/' + nomEvenement + '/' + nomTournoi + '/equipes');
  }

//PAS MIS A JOUR {
  getEquipe(name : string): Observable<Equipe>{
    return this.http.get<Equipe>(this.apiUrl + '/equipes' + name);
  }
//PAS MIS A JOUR }

  addEquipe(equipe: Equipe, nomEvenement: any, nomTournoi: any): Observable<Equipe>{
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(equipe);
    console.log(body);
    return this.http.put<Equipe>(this.apiUrl+'/evenements/'+nomEvenement+'/'+nomTournoi, body,
    {
      headers: headers,
      });
  }
}
