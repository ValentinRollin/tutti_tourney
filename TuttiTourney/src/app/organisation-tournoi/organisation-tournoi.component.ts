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
  nbrEquipes !: number;

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  conseiller: number[]=[];

  constructor(private tourService: TourService, private pouleService: PouleService,
    public route: Router, public activeRoute : ActivatedRoute,private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {

    this.evenements = JSON.parse(localStorage.getItem('evenements')!)
    this.evenement = this.evenements.find(element => element.nomEvenement == this.nomEvenement) || {};
    this.tournoi = this.evenement.tournois?.find(e  => e.nomTournoi == this.nomTournoi) || {tours:[] };
    this.lastTour = this.tournoi.tours.length;
    //this.poules = this.tournoi.tours[ this.lastTour-1 ].poules || [];
    this.equipes = this.tournoi.equipes || [];
    this.nbrEquipes = this.equipes.length;

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
    }
    if(this.tournoi.equipes!.length>=2){
      this.nbPoulesConseillees(this.tournoi.equipes!.length);}
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
      poules : [],
      equipes : this.equipes
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
  nbPoulesConseillees(nbEquipes: number): void{
    let i=0
    let p=1
    let pow2proche;
    while(p<nbEquipes){
        p=p*2;
        i=i+1;}
    if (p-nbEquipes<nbEquipes-p/2){pow2proche= p;}
        
    else {pow2proche= p/2;i=i-1;}
    let x=2
    for (let j:number = 0; j<6; j=j+2 ){
      this.conseiller[j]=pow2proche/x;
      this.conseiller[j+1]=Math.ceil(nbEquipes/this.conseiller[j]);
      x=x*2
    }
  }
};

