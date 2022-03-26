import { Component, OnInit } from '@angular/core';
import { Equipe } from '../interfaces/equipe';
import { Router } from '@angular/router';
import { EquipeService } from '../services/equipe.service';
import { TournoiService } from '../services/tournois.service';
import { Evenement } from '../interfaces/evenement';
import { EvenementService } from '../services/evenement.service';

@Component
({
  selector: 'app-create-equipe',
  templateUrl: './create-equipe.component.html',
  styleUrls: ['./create-equipe.component.scss']
})

export class CreateEquipeComponent implements OnInit
{
  equipes: Equipe[] = [];
  newEquipe : Equipe = {};
  evenements !: any[];
  evenement : any ;
  tournois !: any[];
  tournoi: any;

  constructor(private equipeService: EquipeService, private evenementService: EvenementService, public route: Router){}

  onSubmit(): void
  {

    console.log(this.evenement.nomEvenement);
    console.log(this.tournoi.nomTournoi);

    // //post to restAPI
    this.equipeService.addEquipe(this.newEquipe, this.evenement.nomEvenement, this.tournoi.nomTournoi).subscribe
    (
      (data) => console.log(data),
      (error: any) => console.log(error),
      ()=> console.log("Succesfully added equipe to database")
    );
  }

  ngOnInit(): void {
    this.evenementService.getEvenements().subscribe(
      (data) => this.evenements = data
    );
  }

  onChange(evenement : any): void{
    this.tournois = evenement.tournois;
    //console.log(this.tournois);
  }
}
