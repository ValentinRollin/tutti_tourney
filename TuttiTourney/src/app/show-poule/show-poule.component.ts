import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipe } from '../interfaces/equipe';
import { Evenement } from '../interfaces/evenement';
import { Match } from '../interfaces/match';
import { Poule } from '../interfaces/poule';
import { Tournoi } from '../interfaces/tournoi';
import { EquipeService } from '../services/equipe.service';
import { EvenementService } from '../services/evenement.service';
import { MatchService } from '../services/match.service';
import { PouleService } from '../services/poule.service';
import { TournoiService } from '../services/tournois.service';

@Component({
  selector: 'app-show-poule',
  templateUrl: './show-poule.component.html',
  styleUrls: ['./show-poule.component.scss']
})
export class ShowPouleComponent implements OnInit {

  nomEvenement : any = this.activeRoute.snapshot.paramMap.get('nomEvenement');
  nomTournoi : any = this.activeRoute.snapshot.paramMap.get('nomTournoi');

  evenements : Evenement[] = JSON.parse(localStorage.getItem('evenements')!);
  evenement !: Evenement;
  tournoi !: Tournoi;
  lastTour : number = 0;

  poules : Poule[] = [];
  equipes : any[] = [];
  matchs : Match[] = [];

  nombrePoule !: number;

  constructor(private pouleService: PouleService, private tournoiService: TournoiService, private evenementService: EvenementService,
    public route: Router, public activeRoute : ActivatedRoute) { }

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
  }

  attributionPoule(equipes : Equipe[],  poules: Poule[]) : void {

    let nombrePoule = poules.length;
    console.log(nombrePoule);
    let i : number = 0;
    let sens = 0;
    if (nombrePoule == 0 || nombrePoule==undefined){
        return ;
    }
    while (equipes.length > 0){

      if (sens == 0 && i<nombrePoule){
        poules[i].equipes?.push(equipes[0]);
        equipes.shift();
        i++;
      }
      else if (sens !=0 && i>=0){
        poules[i].equipes?.push(equipes[0]);
        equipes.shift();
        i--;
      }
      else if (sens == 0){
        sens=1;i--;
      }
      else {
        sens=0;
        i++;
      }
    }

    this.pouleService.updatePoule(this.poules, this.nomEvenement, this.nomTournoi, 1).subscribe
    (
      (data) => console.log(data),
      (error: any) => console.log(error),
      ()=> console.log("Succesfully updated poules to database")
    );

    this.tournoi.etat = 1;
    this.tournoiService.updateTournoi(this.tournoi, this.nomTournoi, this.nomEvenement).subscribe
    (
      (data) => console.log(data),
      (error: any) => console.log(error),
      ()=> console.log("Succesfully updated poules to database")
    );
  }

  genererMatch(poules:Poule[]):void{
    for (let poule of poules){
      let n:number =poule.equipes!.length;

      this.matchs = [];
      for (let i = 0; i< n - 1; i++){
        for (let j = i+1; j< n  ; j++){

          poule.matchs!.push({
            nomEquipe1 : poule.equipes![i].nomEquipe,
            nomEquipe2 : poule.equipes![j].nomEquipe
          })
          console.log(poule.equipes![i].nomEquipe+" Versus "+ poule.equipes![j].nomEquipe);
        }

      }
    }

    this.pouleService.updatePoule(this.poules, this.nomEvenement, this.nomTournoi, 1).subscribe
    (
      (data) => console.log(data),
      (error: any) => console.log(error),
      ()=> console.log("Succesfully updated poules to database")
    );

  }

}
