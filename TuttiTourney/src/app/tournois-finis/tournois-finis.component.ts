import { Component, OnInit } from '@angular/core';
import { TournoiService } from '../services/tournois.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EvenementService } from '../services/evenement.service';
@Component({
  selector: 'app-tournois-finis',
  templateUrl: './tournois-finis.component.html',
  styleUrls: ['./tournois-finis.component.scss']
})
export class TournoisFinisComponent implements OnInit {

  nomEvenement: any;
  evenements :any = []
  constructor(public route: Router, private evenementService: EvenementService) { }

  ngOnInit(): void {

      this.evenementService.getEvenements().subscribe
      (
        (data) => {localStorage.setItem('evenements', JSON.stringify(data)), this.evenements = JSON.parse(localStorage.getItem('evenements')!) }
      );

  }

  redirectionTournoiFini(nomEvenement : any, nomTournoi : any): void
  {
    this.route.navigate(["/tournois-finis", nomEvenement, nomTournoi]);
  }


}
