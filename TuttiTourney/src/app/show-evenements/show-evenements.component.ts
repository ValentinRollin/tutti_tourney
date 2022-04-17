import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EvenementService } from '../services/evenement.service';
import { TokenStorageService } from '../services/token-storage.service';
@Component({
  selector: 'app-show-evenements',
  templateUrl: './show-evenements.component.html',
  styleUrls: ['./show-evenements.component.scss']
})
export class ShowEvenementsComponent implements OnInit {

  evenements !: any[];
  currentUser: any;
  constructor(private evenementService: EvenementService, public route : Router,private token: TokenStorageService) { }
  

  ngOnInit(): void
  {
    this.currentUser = this.token.getUser();
    this.evenementService.getEvenements().subscribe
    (
      (data) => this.evenements = data
    );
  }

  redirection(nomEvenement : string): void
  {
    //console.log(nom);
    this.route.navigate(["/tournois",nomEvenement]);
  }

}
