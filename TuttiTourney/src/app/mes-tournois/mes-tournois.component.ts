import { Component, OnInit } from '@angular/core';
import { TournoiService } from '../services/tournois.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EvenementService } from '../services/evenement.service';
import { TokenStorageService } from '../services/token-storage.service';
@Component({
  selector: 'app-mes-tournois',
  templateUrl: './mes-tournois.component.html',
  styleUrls: ['./mes-tournois.component.scss']
})
export class MesTournoisComponent implements OnInit {

  nomEvenement: any;
  evenements :any = []
  constructor(public route: Router, private evenementService: EvenementService,private tokenStorageService: TokenStorageService) { }

  id: string=this.tokenStorageService.getUser().id;
  ngOnInit(): void {

      this.evenementService.getEvenements().subscribe
      (
        (data) => {localStorage.setItem('evenements', JSON.stringify(data)), this.evenements = JSON.parse(localStorage.getItem('evenements')!) }
      );

  }

  redirectionGererTournoi(nomEvenement : any, nomTournoi : any): void
  {
    this.route.navigate(["/mes-tournois/gerer", nomEvenement, nomTournoi]);
  }

  redirectionOrganisation(nomEvenement : any, nomTournoi : any) : void {
    this.route.navigate(["/organisation", nomEvenement, nomTournoi]);
  }


}
