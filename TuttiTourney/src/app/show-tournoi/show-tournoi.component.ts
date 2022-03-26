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
  nomEvenement : string | null = this.activeRoute.snapshot.paramMap.get('nom')

  ngOnInit(): void
  {
    this.tournoiService.getTournois( this.nomEvenement ).subscribe
    (
      (data) => this.tournois = data
    );

  }

  redirection(): void
  {

  }

}
