import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evenement } from '../interfaces/evenement';
import { Tournoi } from '../interfaces/tournoi';
import { TournoiService } from '../services/tournois.service';
import { TokenStorageService } from '../services/token-storage.service';
@Component({
  selector: 'app-show-tournoi',
  templateUrl: './show-tournoi.component.html',
  styleUrls: ['./show-tournoi.component.scss']
})
export class ShowTournoiComponent implements OnInit {

  constructor(private tournoiService: TournoiService, public route: Router,  public activeRoute: ActivatedRoute,private tokenStorageService: TokenStorageService) { }

  evenements !: Evenement[];
  evenement !: any;

  tournois !: any;
  nomEvenement : any = this.activeRoute.snapshot.paramMap.get('nomEvenement');

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  ngOnInit(): void
  {
    this.evenements = JSON.parse(localStorage.getItem('evenements')!)
    this.evenement = this.evenements.find(element => element.nomEvenement == this.nomEvenement);
    this.tournois = this.evenement.tournois;

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
    }

  }

  redirectionInscriptionEquipe(nomEvenement : any, nomTournoi : any): void
  {
    this.route.navigate(["/create-equipe", nomEvenement, nomTournoi]);
  }

  redirectionOrganisation(nomEvenement : any, nomTournoi : any) : void {
    this.route.navigate(["/organisation", nomEvenement, nomTournoi]);
  }

}
