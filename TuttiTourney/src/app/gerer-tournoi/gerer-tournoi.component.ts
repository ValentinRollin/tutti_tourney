import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { last } from 'rxjs';
import { Match } from '../interfaces/match';
import { Tournoi } from '../interfaces/tournoi';
import { TournoiService } from '../services/tournois.service';

@Component({
  selector: 'app-gerer-tournoi',
  templateUrl: './gerer-tournoi.component.html',
  styleUrls: ['./gerer-tournoi.component.scss']
})
export class GererTournoiComponent implements OnInit {

  nomEvenement : any = this.activeRoute.snapshot.paramMap.get('nomEvenement');
  nomTournoi : any = this.activeRoute.snapshot.paramMap.get('nomTournoi');
  tournoi :Tournoi = {tours : []};
  lastTour: any = 1;
  vainqueur : any;
  constructor(private route : Router, public activeRoute : ActivatedRoute, private tournoiService: TournoiService) { }

  ngOnInit(): void {

    this.tournoiService.getTournoi( this.nomEvenement, this.nomTournoi ).subscribe
    (
      (data) => {this.tournoi = data, this.lastTour = this.tournoi.tours.length}
    );
  }

  incrScore1(match: Match) : void {
    if (match.scoreEquipe1 != undefined){
      match.scoreEquipe1 += 1
    }
  }

  incrScore2(match: Match) : void {
    if (match.scoreEquipe2 != undefined){
      match.scoreEquipe2 += 1
    }
  }

  addVainqueur(match:Match): void{
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
