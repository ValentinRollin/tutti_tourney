import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipe } from '../interfaces/equipe';
import { Poule } from '../interfaces/poule';
import { Tournoi } from '../interfaces/tournoi';
import { EquipeService } from '../services/equipe.service';
import { PouleService } from '../services/poule.service';
import { TournoiService } from '../services/tournois.service';

@Component({
  selector: 'app-organisation-tournoi',
  templateUrl: './organisation-tournoi.component.html',
  styleUrls: ['./organisation-tournoi.component.scss']
})
export class OrganisationTournoiComponent implements OnInit {

  tournoi : Tournoi = {};
  equipes : any[] = [];
  nomEvenement : any = this.activeRoute.snapshot.paramMap.get('nomEvenement');
  nomTournoi : any = this.activeRoute.snapshot.paramMap.get('nomTournoi');

  newPoule : Poule = {};
  poules : Poule[] = [];
  nombrePoule !: Number;

  constructor(private tournoiService: TournoiService, private equipeService: EquipeService, private pouleService: PouleService,
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

    this.pouleService.getPoules( this.nomEvenement, this.nomTournoi ).subscribe
    (
      (data) => this.poules = data
    );
  }

  onSubmit() : void{
    console.log(this.equipes);
    //this.ajoutNbPoule(this.nombrePoule);

    this.attributionPoule(this.equipes, this.nombrePoule, this.poules);

    this.pouleService.updatePoule(this.poules, this.nomEvenement, this.nomTournoi).subscribe
    (
      (data) => console.log(data),
      (error: any) => console.log(error),
      ()=> console.log("Succesfully updated poules to database")
    );

  }

  attributionPoule(equipes : Equipe[], nombrePoule: Number, poules: Poule[]) : void {

    let i : number = 0;
    let sens = 0;
    if (nombrePoule == 0 || nombrePoule==undefined){
        return ;
    }
    while (equipes.length > 0){
      console.log("yo");
      console.log(equipes.length);
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
  }

  ajoutNbPoule(nombrePoule : Number): void {
    for (let i:number = 0; i<nombrePoule; i++ ){
      this.newPoule = {
        numeroPoule : i+1
      }
      console.log(this.newPoule);
      this.pouleService.addPoule(this.newPoule, this.nomEvenement, this.nomTournoi).subscribe
      (
        (data) => console.log(data),
        (error: any) => console.log(error),
        ()=> console.log("Succesfully updated poules to database")
      );
     };
    }


};

