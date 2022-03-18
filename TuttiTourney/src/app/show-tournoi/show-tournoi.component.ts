import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tournoi } from '../interfaces/tournoi';
import { TournoiService } from '../services/tournois.service';

@Component({
  selector: 'app-show-tournoi',
  templateUrl: './show-tournoi.component.html',
  styleUrls: ['./show-tournoi.component.scss']
})
export class ShowTournoiComponent implements OnInit {

  constructor(private tournoiService: TournoiService, public route: Router) { }

  tournois !: Tournoi[];

  ngOnInit(): void
  {
    //console.log(this.tournois[0]);

    this.tournoiService.getTournois().subscribe
    (
      (data) => this.tournois = data
    );

    //console.log(this.tournois.length);

    //for (let i = 0; i < this.tournois.length; i++)
    //{
    //  console.log(this.tournois);

    //  if (this.tournois[i] == "test")
    //  {
    //    this.tournois.splice(i);
    //  }
    //}

    console.log(this.tournois);
  }

  redirection(): void
  {
    
  }

}
