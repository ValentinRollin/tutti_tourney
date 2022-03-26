import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EvenementService } from '../services/evenement.service';

@Component({
  selector: 'app-show-evenements',
  templateUrl: './show-evenements.component.html',
  styleUrls: ['./show-evenements.component.scss']
})
export class ShowEvenementsComponent implements OnInit {

  evenements !: any[];

  constructor(private evenementService: EvenementService, public route : Router) { }

  ngOnInit(): void
  {
    this.evenementService.getEvenements().subscribe
    (
      (data) => this.evenements = data
    );
  }

  redirection(nom : string): void
  {
    console.log(nom);
    this.route.navigate(["/tournois",nom]);
  }

}
