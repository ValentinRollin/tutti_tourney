import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tour } from '../interfaces/tour';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  addTour(tour: Tour, nomEvenement: any, nomTournoi: any): Observable<Tour>{
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(tour);
    console.log(body);
    return this.http.put<Tour>(this.apiUrl+'/evenements/'+nomEvenement+'/'+nomTournoi + '/tour', body,
    {
      headers: headers,
      });
  }
}
