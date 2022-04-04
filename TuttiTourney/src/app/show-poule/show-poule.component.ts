import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipe } from '../interfaces/equipe';
import { Poule } from '../interfaces/poule';
import { Tournoi } from '../interfaces/tournoi';
import { EquipeService } from '../services/equipe.service';
import { PouleService } from '../services/poule.service';

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

  constructor(private pouleService: PouleService, private equipeService: EquipeService, public route: Router, public activeRoute : ActivatedRoute) { }

  ngOnInit(): void {

    this.equipeService.getEquipes( this.nomEvenement, this.nomTournoi ).subscribe
    (
      (data) => this.equipes = data
    );

    this.pouleService.getPoules( this.nomEvenement, this.nomTournoi ).subscribe
    (
      (data) => this.poules = data
    );

    this.equipeService.getEquipes( this.nomEvenement, this.nomTournoi ).subscribe
    (
      (data) => this.equipes = data
    );

  }

  attributionPoule(equipes : Equipe[],  poules: Poule[]) : void {

    console.log(equipes);

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

    this.tournoi.etat = 1;

    this.pouleService.updatePoule(this.poules, this.nomEvenement, this.nomTournoi).subscribe
    (
      (data) => console.log(data),
      (error: any) => console.log(error),
      ()=> console.log("Succesfully updated poules to database")
    );

  }

}
