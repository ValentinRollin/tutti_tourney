import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { findIndex, last } from 'rxjs';
import { Evenement } from '../interfaces/evenement';
import { Match } from '../interfaces/match';
import { Poule } from '../interfaces/poule';
import { Tournoi } from '../interfaces/tournoi';
import { EvenementService } from '../services/evenement.service';
import { MatchService } from '../services/match.service';
@Component({
  selector: 'app-voir-tournoi',
  templateUrl: './voir-tournoi.component.html',
  styleUrls: ['./voir-tournoi.component.scss']
})
export class VoirTournoiComponent implements OnInit {

  nomEvenement : any = this.activeRoute.snapshot.paramMap.get('nomEvenement');
  nomTournoi : any = this.activeRoute.snapshot.paramMap.get('nomTournoi');

  evenements : Evenement[] = JSON.parse(localStorage.getItem('evenements')!);
  evenement !: Evenement;
  tournoi !: Tournoi;
  lastTour : number = 0;
  poules : Poule[] = [];
  equipes : any[] = [];
  matchs :any = [];
  vainqueur : any;

  indexTournoi: number | undefined;

  constructor(private route : Router, public activeRoute : ActivatedRoute, private evenementService: EvenementService, private matchService: MatchService) { }

  ngOnInit(): void {
    this.evenementService.getEvenements().subscribe
    (
      (data) => {
        localStorage.setItem('evenements', JSON.stringify(data)), this.evenements = JSON.parse(localStorage.getItem('evenements')!),
        this.initAll() }
    );
  }
  initAll(): void{
    this.evenement = this.evenements.find(element => element.nomEvenement == this.nomEvenement) || {};
    this.tournoi = this.evenement.tournois?.find(e  => e.nomTournoi == this.nomTournoi) || {tours:[] };
    this.lastTour = this.tournoi.tours.length;
    this.poules = this.tournoi.tours[ this.lastTour-1 ].poules || [];
    this.equipes = this.tournoi.equipes || [];
    for (let poule of this.poules){
      this.matchs.push(poule.matchs);
    }
    console.log(this.matchs);

  }

}
