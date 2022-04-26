import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Evenement } from '../interfaces/evenement';
import { Tournoi } from '../interfaces/tournoi';
import { EvenementService } from '../services/evenement.service';
import { TournoiService } from '../services/tournois.service';
import { TokenStorageService } from '../services/token-storage.service';

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
  isLoggedIn = false;
  constructor(private tournoiservice: TournoiService, public route: Router, private tokenStorageService: TokenStorageService) {}
  onSubmit(): void {

    //post to restAPI
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.newTournoi.organisateur=user.id;}
    this.tournoiservice.addTournoi(this.newTournoi, this.evenement.nomEvenement ).subscribe(
      (data) => console.log(data),
      (error: any) => console.log(error),
      ()=> console.log("Succesfully added Tournois to database")
    );

//    console.log(this.evenement.nomEvenement);
   }

  ngOnInit(): void {

    this.evenements = JSON.parse(localStorage.getItem('evenements')!)

  }

}

