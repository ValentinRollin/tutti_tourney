import { Component, OnInit } from '@angular/core';
import Evenement from './models/evenements';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-create-evenement',
  templateUrl: './create-evenement.component.html',
  styleUrls: ['./create-evenement.component.scss'],
})
export class CreateEvenementComponent {
  events: Evenement[] = [];
  newEvenement: Evenement = new Evenement();

  constructor(private httpClient: HttpClient) {}

  onSubmit(): void {

    //ajout a la liste d'event
    this.events.push(this.newEvenement);

    //post to restAPI
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(this.newEvenement);
    console.log(body);
    this.httpClient.post('http://localhost:3000/events/', body, {
      headers: headers,
    })
    .subscribe(data => {
      console.log(data);
    });

    //reset newEvenement
    this.newEvenement = new Evenement();
  }

  ngOnInit(): void {
    this.httpClient.get('http://localhost:3000/events').subscribe((data) => {
      console.log(data);
    });

  }
}
