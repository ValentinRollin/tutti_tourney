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

  getEquipes(): Observable<Equipe[]>{
    return this.http.get<Equipe[]>(this.apiUrl+'/equipes');
  }

  getEquipe(name : string): Observable<Equipe>{
    return this.http.get<Equipe>(this.apiUrl + '/equipes' + name);
  }

  createEquipe(equipe: Equipe): Observable<Equipe>{
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(equipe);
    console.log(body);
    return this.http.post<Equipe>(this.apiUrl+'/equipes', body,
    {
      headers: headers,
      });
  }
}
