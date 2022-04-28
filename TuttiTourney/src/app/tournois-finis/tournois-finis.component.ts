import { Component, OnInit } from '@angular/core';
import { TournoiService } from '../services/tournois.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EvenementService } from '../services/evenement.service';
import { Tournoi } from '../interfaces/tournoi';
@Component({
  selector: 'app-tournois-finis',
  templateUrl: './tournois-finis.component.html',
  styleUrls: ['./tournois-finis.component.scss']
})
export class TournoisFinisComponent implements OnInit {

  nomEvenement: any;
  evenements :any = []

  constructor(public route: Router, private evenementService: EvenementService) { }

  ngOnInit(): void {

      this.evenementService.getEvenements().subscribe
      (
        (data) => {localStorage.setItem('evenements', JSON.stringify(data)), this.evenements = JSON.parse(localStorage.getItem('evenements')!) }
      );

  }

  redirectionTournoiFini(nomEvenement : any, nomTournoi : any): void
  {
    this.route.navigate(["/tournois-finis", nomEvenement, nomTournoi]);
  }

  addVainqueur(tournoi: Tournoi): void{
    let lastTour = tournoi.tours.length;
    let lastPoule = 0;
    let match = tournoi.tours[lastTour-1].poules![lastPoule].matchs![0];

    if (match.scoreEquipe1 != undefined && match.scoreEquipe2 != undefined){
      if (match.scoreEquipe1 > match.scoreEquipe2){
        match.vainqueur = match.nomEquipe1;
      }
      else{
        match.vainqueur = match.nomEquipe2;
      }
    }

  }

}
