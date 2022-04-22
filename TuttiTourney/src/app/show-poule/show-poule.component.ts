import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipe } from '../interfaces/equipe';
import { Match } from '../interfaces/match';
import { Poule } from '../interfaces/poule';
import { Tournoi } from '../interfaces/tournoi';
import { EquipeService } from '../services/equipe.service';
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

  tournoi : any = {};
  poules : Poule[] = [];
  equipes : any[] = [];
  matchs : Match[] = [];

  nombrePoule !: number;

  constructor(private pouleService: PouleService, private equipeService: EquipeService, private tournoiService: TournoiService,
    private matchService: MatchService,
    public route: Router, public activeRoute : ActivatedRoute) { }

  ngOnInit(): void {

     this.tournoiService.getTournoi( this.nomEvenement, this.nomTournoi ).subscribe
    (
      (data) => this.tournoi = data
    );

    this.equipeService.getEquipes( this.nomEvenement, this.nomTournoi ).subscribe
    (
      (data) => this.equipes = data
    );

    this.pouleService.getPoules( this.nomEvenement, this.nomTournoi, 1 ).subscribe
    (
      (data) => {this.poules = data, console.log(this.poules)}
    );



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
      //console.log(this.matchs);

    //   this.matchService.addMatchs(this.matchs, this.nomEvenement, this.nomTournoi, 0, poule.numeroPoule).subscribe
    // (
    //   (data) => console.log(data),
    //   (error: any) => console.log(error),
    //   ()=> console.log(this.matchs)
    // );
    }

    this.pouleService.updatePoule(this.poules, this.nomEvenement, this.nomTournoi, 1).subscribe
    (
      (data) => console.log(data),
      (error: any) => console.log(error),
      ()=> console.log("Succesfully updated poules to database")
    );

  }

}
