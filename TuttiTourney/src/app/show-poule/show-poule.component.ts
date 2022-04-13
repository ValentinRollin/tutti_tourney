import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipe } from '../interfaces/equipe';
import { Poule } from '../interfaces/poule';
import { Tournoi } from '../interfaces/tournoi';
import { EquipeService } from '../services/equipe.service';
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

  tournoi : Tournoi = {};
  poules : Poule[] = [];
  equipes : any[] = [];

  nombrePoule !: number;

  constructor(private pouleService: PouleService, private equipeService: EquipeService, private tournoiService: TournoiService, public route: Router, public activeRoute : ActivatedRoute) { }

  ngOnInit(): void {

    this.equipeService.getEquipes( this.nomEvenement, this.nomTournoi ).subscribe
    (
      (data) => this.equipes = data
    );

    this.pouleService.getPoules( this.nomEvenement, this.nomTournoi ).subscribe
    (
      (data) => this.poules = data
    );

  }

  attributionPoule(equipes : Equipe[],  poules: Poule[]) : void {

    let nombrePoule = poules.length;
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

    this.pouleService.updatePoule(this.poules, this.nomEvenement, this.nomTournoi).subscribe
    (
      (data) => console.log(data),
      (error: any) => console.log(error),
      ()=> console.log("Succesfully updated poules to database")
    );

    console.log("je change l'etat")
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

      for (let i = 0; i< n - 1; i++){
        for (let j = i+1; j< n  ; j++){
          console.log(poule.equipes![i].nomEquipe+" Versus "+ poule.equipes![j].nomEquipe);
        }
      }
    }
  }

}
