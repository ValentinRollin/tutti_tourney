import { Component, OnInit } from '@angular/core';
import { TournoiService } from '../services/tournois.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EvenementService } from '../services/evenement.service';

@Component({
  selector: 'app-tournois-en-cours',
  templateUrl: './tournois-en-cours.component.html',
  styleUrls: ['./tournois-en-cours.component.scss']
})
export class TournoisEnCoursComponent implements OnInit {

  nomEvenement: any;
  evenements :any = []
  constructor(public route: Router, private evenementService: EvenementService) { }

  ngOnInit(): void {

      this.evenementService.getEvenements().subscribe
      (
        (data) => {localStorage.setItem('evenements', JSON.stringify(data)), this.evenements = JSON.parse(localStorage.getItem('evenements')!) }
      );

  }

  redirectionTournoiEnCours(nomEvenement : any, nomTournoi : any): void
  {
    this.route.navigate(["/tournois-en-cours", nomEvenement, nomTournoi]);
  }


}
