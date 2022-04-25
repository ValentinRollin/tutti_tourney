import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evenement } from '../interfaces/evenement';
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

  nomEvenement : any = this.activeRoute.snapshot.paramMap.get('nomEvenement');
  nomTournoi : any = this.activeRoute.snapshot.paramMap.get('nomTournoi');

  evenements : Evenement[] = JSON.parse(localStorage.getItem('evenements')!);
  evenement !: Evenement;
  tournoi !: Tournoi;
  lastTour : number = 0;

  poules : Poule[] = [];
  equipes : any[] = [];

  nombrePoule !: number;
  newTour: Tour = {};
  newPoule : Poule = {};

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private tourService: TourService, private pouleService: PouleService,
    public route: Router, public activeRoute : ActivatedRoute,private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {

    this.evenements = JSON.parse(localStorage.getItem('evenements')!)
    this.evenement = this.evenements.find(element => element.nomEvenement == this.nomEvenement) || {};
    this.tournoi = this.evenement.tournois?.find(e  => e.nomTournoi == this.nomTournoi) || {tours:[] };
    this.lastTour = this.tournoi.tours.length;
    //this.poules = this.tournoi.tours[ this.lastTour-1 ].poules || [];
    this.equipes = this.tournoi.equipes || [];

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
    }
  }

  onSubmit() : void{

    this.tourInit();
    this.ajoutNbPoule(this.nombrePoule);

  }

  redirectionPoule(nomEvenement : any, nomTournoi : any) : void {
    this.route.navigate([ "/poules", nomEvenement, nomTournoi, ]);
  }
  tourInit(): void{

    this.newTour = {
      numeroTour : 1,
      poules : []
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
      this.poules.push(this.newPoule);
    }
    this.pouleService.updatePoule(this.poules, this.nomEvenement, this.nomTournoi, this.newTour.numeroTour).subscribe
    (
      (data) => console.log(data),
      (error: any) => {
        console.log(error),
        this.redirectionPoule(this.nomEvenement, this.nomTournoi) },
      ()=> {
          console.log("Succesfully updated poules to database")}
    );
  }


};

