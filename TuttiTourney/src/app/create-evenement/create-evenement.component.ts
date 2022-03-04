import { Component, OnInit } from '@angular/core';
import {Evenement} from  '../interfaces/evenement'
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { EvenementService } from '../services/evenement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-evenement',
  templateUrl: './create-evenement.component.html',
  styleUrls: ['./create-evenement.component.scss'],
})
export class CreateEvenementComponent {
  events: Evenement[] = [];
  newEvenement : Evenement = {};

  constructor(private eventService: EvenementService, public route: Router) {}

  onSubmit(): void {

    // //ajout a la liste d'event
    this.events.push(this.newEvenement);

    // //post to restAPI
    this.eventService.createEvent(this.newEvenement).subscribe(
      (data) => console.log(data),
      (error: any) => console.log(error),
      ()=> console.log("Succesfully added Event to database")
    );
  }

  ngOnInit(): void {
    // this.eventService.getEvents().subscribe(
    //   (data) => console.table(data)
    // );
  }

//route
  // redirection():void{
  //   this.route.navigate(['/events']);
  // }
}
