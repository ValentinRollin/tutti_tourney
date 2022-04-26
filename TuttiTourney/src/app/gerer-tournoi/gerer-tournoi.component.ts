import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { findIndex, last } from 'rxjs';
import { Evenement } from '../interfaces/evenement';
import { Match } from '../interfaces/match';
import { Poule } from '../interfaces/poule';
import { Tournoi } from '../interfaces/tournoi';
import { EvenementService } from '../services/evenement.service';
import { MatchService } from '../services/match.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-gerer-tournoi',
  templateUrl: './gerer-tournoi.component.html',
  styleUrls: ['./gerer-tournoi.component.scss']
})
export class GererTournoiComponent implements OnInit {

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
  boolClassement : boolean = false;
  classement : any = [];

  indexTournoi: number | undefined;

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private route : Router, public activeRoute : ActivatedRoute, private evenementService: EvenementService, private matchService: MatchService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
    }

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

    for (let i=0; i<this.poules.length; i++){
      for (let match of this.matchs[i]){
        if (match.etat){

          this.addVainqueur(match, this.nomEvenement, this.nomTournoi, i , this.lastTour);

        }
      }
    }
  }

  incrScore1(match: Match, nomEvenement: any, nomTournoi:any, numeroPoule:any, numeroTour:any) : void {
    if (match.scoreEquipe1 != undefined){
      match.scoreEquipe1 += 1
    }

    this.matchService.updateScoresMatchs(match, nomEvenement, nomTournoi, numeroPoule, numeroTour ).subscribe(
      (data) => console.log(data),
      (error: any) => console.log(error),
      ()=> console.log("Succesfully added Tournois to database")
    );

  }

  incrScore2(match: Match, nomEvenement: any, nomTournoi:any, numeroPoule:any, numeroTour:any) : void {
    if (match.scoreEquipe2 != undefined){
      match.scoreEquipe2 += 1
    }
    this.matchService.updateScoresMatchs(match, nomEvenement, nomTournoi, numeroPoule, numeroTour ).subscribe(
      (data) => console.log(data),
      (error: any) => console.log(error),
      ()=> console.log("Succesfully added Tournois to database")
    );
  }

  addVainqueur(match: Match, nomEvenement: any, nomTournoi:any, numeroPoule:any, numeroTour:any): void{
    if (match.scoreEquipe1 != undefined && match.scoreEquipe2 != undefined){
      if (match.scoreEquipe1 > match.scoreEquipe2){
        match.vainqueur = match.nomEquipe1;
      }
      else{
        match.vainqueur = match.nomEquipe2;
      }
    }
    if(!match.etat){
      match.etat = true;
      this.matchService.updateEtatMatchs(match, nomEvenement, nomTournoi, numeroPoule, numeroTour ).subscribe(
        (data) => console.log(data),
        (error: any) => console.log(error),
        ()=> console.log("Succesfully added Tournois to database")
        );
      }
  }

  calculClassement(): void{

    let objet = {};

      for (let poule of this.poules){

        this.classement = [];

        for (let equipe of poule.equipes!){
          objet = {
            nomEquipe: equipe.nomEquipe,
            points: this.calculPoint(equipe.nomEquipe, poule.numeroPoule)
          }

          this.classement.push(objet);
        }
        this.classement.sort((a: { points: number; },b: { points: number; }) => b.points - a.points);
        console.log(this.classement);
        poule.classement = this.classement;
      }

  }
  showClassement(): void{
    this.boolClassement = !this.boolClassement;

    if(this.boolClassement){

      this.calculClassement();
  }
}
  calculPoint(nomEquipe : any, numeroPoule:any): number{
    let compteur = 0;
    for (let match of this.matchs[numeroPoule]){
      if (match.vainqueur == nomEquipe){
        compteur += 1;
      }
    }

    return compteur;
  }

  redirectionNextTour(nomEvenement : any, nomTournoi : any) : void {
    this.route.navigate([ "mes-tournois/gerer/nextTour/", nomEvenement, nomTournoi, ]);
  }

}
