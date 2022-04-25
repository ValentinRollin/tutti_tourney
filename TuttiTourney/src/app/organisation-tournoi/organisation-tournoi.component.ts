import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Poule } from '../interfaces/poule';
import { Tour } from '../interfaces/tour';
import { Tournoi } from '../interfaces/tournoi';
import { PouleService } from '../services/poule.service';
import { TourService } from '../services/tour.service';
import { TournoiService } from '../services/tournois.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-organisation-tournoi',
  templateUrl: './organisation-tournoi.component.html',
  styleUrls: ['./organisation-tournoi.component.scss']
})
export class OrganisationTournoiComponent implements OnInit {

  tournoi : Tournoi = { tours : []};
  equipes : any[] = [];
  nomEvenement : any = this.activeRoute.snapshot.paramMap.get('nomEvenement');
  nomTournoi : any = this.activeRoute.snapshot.paramMap.get('nomTournoi');

  newTour: Tour = {};
  newPoule : Poule = {};
  poules : Poule[] = [];
  nombrePoule !: Number;

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;


  constructor(private tournoiService: TournoiService, private tourService: TourService, private pouleService: PouleService,
    public route: Router, public activeRoute : ActivatedRoute,private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
    }

    this.tournoiService.getTournoi( this.nomEvenement, this.nomTournoi ).subscribe
    (
      (data) => this.tournoi = data
    );

  }

  onSubmit() : void{

    this.tourInit();
    this.ajoutNbPoule(this.nombrePoule);
    this.redirectionPoule(this.nomEvenement, this.nomTournoi);

  }

  redirectionPoule(nomEvenement : any, nomTournoi : any) : void {
    this.route.navigate([ "/poules", nomEvenement, nomTournoi, ]);
  }
  tourInit(): void{

    this.newTour = {
      numeroTour : 1
    }

    this.tourService.addTour(this.newTour,this.nomEvenement, this.nomTournoi).subscribe
    (
        (data) => console.log(data),
        (error: any) => console.log(error),
        ()=> console.log("Succesfully updated poules to database")
      );
  }

  ajoutNbPoule(nombrePoule : Number): void {
    for (let i:number = 0; i<nombrePoule; i++ ){
      this.newPoule = {
        numeroPoule : i
      }
      console.log(this.newPoule);
      this.pouleService.addPoule(this.newPoule, this.nomEvenement, this.nomTournoi, this.newTour.numeroTour).subscribe
      (
        (data) => console.log(data),
        (error: any) => console.log(error),
        ()=> console.log("Succesfully updated poules to database")
      );
     };
    }


};

