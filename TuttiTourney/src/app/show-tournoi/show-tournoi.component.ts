import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tournoi } from '../interfaces/tournoi';
import { TournoiService } from '../services/tournois.service';

@Component({
  selector: 'app-show-tournoi',
  templateUrl: './show-tournoi.component.html',
  styleUrls: ['./show-tournoi.component.scss']
})
export class ShowTournoiComponent implements OnInit {

  constructor(private tournoiService: TournoiService, public route: Router,  public activeRoute: ActivatedRoute) { }

  tournois !: Tournoi[];
  nomEvenement : any = this.activeRoute.snapshot.paramMap.get('nomEvenement');

  ngOnInit(): void
  {
    this.tournoiService.getTournois( this.nomEvenement ).subscribe
    (
      (data) => this.tournois = data
    );

  }

  redirectionInscriptionEquipe(nomEvenement : any, nomTournoi : any): void
  {
    console.log(nomEvenement);
    console.log(nomTournoi);
    this.route.navigate(["/create-equipe", nomEvenement, nomTournoi]);
  }

  redirectionOrganisation(nomEvenement : any, nomTournoi : any) : void {
    this.route.navigate(["/organisation", nomEvenement, nomTournoi]);
  }

}
