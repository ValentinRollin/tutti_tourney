import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tournoi } from '../interfaces/tournoi';
import { TournoiService } from '../services/tournois.service';

@Component({
  selector: 'app-create-tournoi',
  templateUrl: './create-tournoi.component.html',
  styleUrls: ['./create-tournoi.component.scss']
})
export class CreateTournoiComponent implements OnInit {

  tournois: Tournoi[] = [];
  newTournoi : Tournoi = {};

  constructor(private tournoiservice: TournoiService, public route: Router) {}

  onSubmit(): void {

    // //ajout a la liste d'Tournois
    this.tournois.push(this.newTournoi);

    // //post to restAPI
    this.tournoiservice.createTournoi(this.newTournoi).subscribe(
      (data) => console.log(data),
      (error: any) => console.log(error),
      ()=> console.log("Succesfully added Tournois to database")
    );
  }

  ngOnInit(): void {
  }

}
