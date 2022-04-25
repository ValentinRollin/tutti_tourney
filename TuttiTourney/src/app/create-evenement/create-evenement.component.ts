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
  evenements: Evenement[] = [];
  newEvenement : Evenement = {};

  constructor(private evenementService: EvenementService, public route: Router) {}

  onSubmit(): void {

    // //ajout a la liste d'evenement
    this.evenements.push(this.newEvenement);
    localStorage.setItem('evenements', JSON.stringify(this.evenements))

    // //post to restAPI
    this.evenementService.createEvenement(this.newEvenement).subscribe(
      (data) => console.log(data),
      (error: any) => console.log(error),
      ()=> console.log("Succesfully added Evenement to database")
    );

    //redirection vers create-tournoi
    this.redirection();
  }

  ngOnInit(): void {

    this.evenements = JSON.parse(localStorage.getItem('evenements')!)

  }

//route
  redirection():void{
    this.route.navigate(['/create-tournoi']);
  }
}
