import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evenement } from '../interfaces/evenement';
import { Tournoi } from '../interfaces/tournoi';
import { TournoiService } from '../services/tournois.service';

@Component({
  selector: 'app-show-tournoi',
  templateUrl: './show-tournoi.component.html',
  styleUrls: ['./show-tournoi.component.scss']
})
export class ShowTournoiComponent implements OnInit {

  constructor(public route: Router,  public activeRoute: ActivatedRoute) { }

  evenements !: Evenement[];
  evenement !: any;

  tournois !: any;
  nomEvenement : any = this.activeRoute.snapshot.paramMap.get('nomEvenement');

  ngOnInit(): void
  {
    this.evenements = JSON.parse(localStorage.getItem('evenements')!)
    this.evenement = this.evenements.find(element => element.nomEvenement == this.nomEvenement);
    this.tournois = this.evenement.tournois;

  }

  redirectionInscriptionEquipe(nomEvenement : any, nomTournoi : any): void
  {
    this.route.navigate(["/create-equipe", nomEvenement, nomTournoi]);
  }

  redirectionOrganisation(nomEvenement : any, nomTournoi : any) : void {
    this.route.navigate(["/organisation", nomEvenement, nomTournoi]);
  }

}
