import { Component, OnInit } from '@angular/core';
import { Equipe } from '../interfaces/equipe';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipeService } from '../services/equipe.service';


@Component
({
  selector: 'app-create-equipe',
  templateUrl: './create-equipe.component.html',
  styleUrls: ['./create-equipe.component.scss']
})

export class CreateEquipeComponent implements OnInit
{
  newEquipe : Equipe = {};

  nomEvenement : any = this.activeRoute.snapshot.paramMap.get('nomEvenement');
  nomTournoi : any = this.activeRoute.snapshot.paramMap.get('nomTournoi');

  constructor(private equipeService: EquipeService, public activeRoute: ActivatedRoute, public route: Router){}

  onSubmit(): void
  {

    // //post to restAPI
    this.equipeService.addEquipe(this.newEquipe, this.nomEvenement, this.nomTournoi).subscribe
    (
      (data) => console.log(data),
      (error: any) => console.log(error),
      ()=> console.log("Succesfully added equipe to database")
    );
  }

  ngOnInit(): void {

  }
}
