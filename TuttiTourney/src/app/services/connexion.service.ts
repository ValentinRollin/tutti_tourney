import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ConnexionService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/api/auth/signin');
  }

  connectUser(evenement: User): Observable<User> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(evenement);
    console.log(body);

    return this.http.post<User>(this.apiUrl + '/api/auth/signin', body,
      {
        headers: headers,
      });
  }

}
