import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evenement } from '../interfaces/evenement';
import { Poule } from '../interfaces/poule';
import { Tour } from '../interfaces/tour';
import { Tournoi } from '../interfaces/tournoi';
import { PouleService } from '../services/poule.service';
import { TokenStorageService } from '../services/token-storage.service';
import { TourService } from '../services/tour.service';

@Component({
  selector: 'app-next-tour',
  templateUrl: './next-tour.component.html',
  styleUrls: ['./next-tour.component.scss']
})
export class NextTourComponent implements OnInit {

  constructor(private tourService: TourService, private pouleService: PouleService,
    public route: Router, public activeRoute : ActivatedRoute,private tokenStorageService: TokenStorageService) { }

  nomEvenement : any = this.activeRoute.snapshot.paramMap.get('nomEvenement');
  nomTournoi : any = this.activeRoute.snapshot.paramMap.get('nomTournoi');

  evenements : Evenement[] = JSON.parse(localStorage.getItem('evenements')!);
  evenement !: Evenement;
  tournoi !: Tournoi;
  lastTour : number = 0;

  poules : Poule[] = [];
  equipes : any[] = [];
  matchs :any = [];
  nombrePoules !: number;
  nombreEquipes !: number;
  classement : any = [];
  newTour: Tour = {};
  newPoule : Poule = {};
  newPoules : Poule[] = [];
  nbrEquipes !: number;
  newEquipes : any = [];

  ngOnInit(): void {
    this.initAll();
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

  }

  onSubmit() : void{
    this.nouvellesEquipes();
    this.nextTour();
    this.ajoutNbPoule(this.nombrePoules);

  }

  nouvellesEquipes(): void{

    this.calculClassement();

    for (let poule of this.poules){
      for(let i = 0; i<this.nombreEquipes; i++){
        for (let equipe of poule.equipes!){

          if(equipe.nomEquipe == poule.classement![i]['nomEquipe']){
            this.newEquipes.push(equipe!);
          }
        }
      }
    }

    console.log(this.newEquipes);
  }

  nextTour(): void{

    this.newTour = {
      numeroTour : this.lastTour+1,
      poules : [],
      equipes : this.newEquipes
    }

    this.tourService.addTour(this.newTour,this.nomEvenement, this.nomTournoi).subscribe
    (
        (data) => console.log(data),
        (error: any) => console.log(error),
        ()=> console.log("Succesfully updated poules to database")
      );
  }

  redirectionPoule(nomEvenement : any, nomTournoi : any) : void {
    this.route.navigate([ "/poules", nomEvenement, nomTournoi, ]);
  }

  ajoutNbPoule(nombrePoule : Number): void {
    for (let i:number = 0; i<nombrePoule; i++ ){
      this.newPoule = {
        numeroPoule : i
      }
      this.newPoules.push(this.newPoule);
    }
    this.pouleService.updatePoule(this.newPoules, this.nomEvenement, this.nomTournoi, this.newTour.numeroTour).subscribe
    (
      (data) => console.log(data),
      (error: any) => {
        console.log(error),
        this.redirectionPoule(this.nomEvenement, this.nomTournoi) },
      ()=> {
          console.log("Succesfully updated poules to database")}
    );
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

  calculPoint(nomEquipe : any, numeroPoule:any): number{
    let compteur = 0;
    for (let match of this.matchs[numeroPoule]){
      if (match.vainqueur == nomEquipe){
        compteur += 1;
      }
    }

    return compteur;
  }

}
