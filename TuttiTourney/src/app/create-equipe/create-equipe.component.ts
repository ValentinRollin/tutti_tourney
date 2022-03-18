import { Component, OnInit } from '@angular/core';
import { Equipe } from '../interfaces/equipe';
import { Router } from '@angular/router';
import { EquipeService } from '../services/equipe.service';

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

  constructor(private equipeService: EquipeService, public route: Router){}

  onSubmit(): void
  {

    // //ajout a la liste d'equipe
    this.equipes.push(this.newEquipe);

    // //post to restAPI
    this.equipeService.createEquipe(this.newEquipe).subscribe
    (
      (data) => console.log(data),
      (error: any) => console.log(error),
      ()=> console.log("Succesfully added equipe to database")
    );
  }

  ngOnInit(): void
  {
  }

}
