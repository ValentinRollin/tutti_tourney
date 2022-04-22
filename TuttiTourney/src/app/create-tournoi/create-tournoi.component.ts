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
  newTournoi : Tournoi = {tours : []};
  evenements !: any[];
  evenement : Evenement = {};

  constructor(private tournoiservice: TournoiService, public route: Router, private evenementService: EvenementService) {}

  onSubmit(): void {

    //post to restAPI
    this.tournoiservice.addTournoi(this.newTournoi, this.evenement.nomEvenement ).subscribe(
      (data) => console.log(data),
      (error: any) => console.log(error),
      ()=> console.log("Succesfully added Tournois to database")
    );

//    console.log(this.evenement.nomEvenement);
   }

  ngOnInit(): void {
    this.evenementService.getEvenements().subscribe(
      (data) => this.evenements = data
    );
  }

}
