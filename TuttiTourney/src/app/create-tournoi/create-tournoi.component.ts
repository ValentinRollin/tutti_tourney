import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Evenement } from '../interfaces/evenement';
import { Tournoi } from '../interfaces/tournoi';
import { EvenementService } from '../services/evenement.service';
import { TournoiService } from '../services/tournois.service';

@Component({
  selector: 'app-create-tournoi',
  templateUrl: './create-tournoi.component.html',
  styleUrls: ['./create-tournoi.component.scss']
})
export class CreateTournoiComponent implements OnInit {

  tournois: Tournoi[] = [];
  newTournoi : Tournoi = {};
  events !: any[];
  nomEvenement : String = "";

  constructor(private tournoiservice: TournoiService, public route: Router, private eventService: EvenementService) {}

  onSubmit(): void {

    //update Evenement to restAPI
    this.eventService.updateEvent(this.nomEvenement, this.newTournoi).subscribe(
      (data) => console.log(data),
      (error: any) => console.log(error),
      ()=> console.log("Succesfully update evenement to database")
    );

    //post to restAPI
    this.tournoiservice.createTournoi(this.newTournoi).subscribe(
      (data) => console.log(data),
      (error: any) => console.log(error),
      ()=> console.log("Succesfully added Tournois to database")
    );

    console.log(this.nomEvenement);
   }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(
      (data) => this.events = data
    );
  }

}
