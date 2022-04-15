import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user'
import { ConnexionService } from '../services/connexion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion-user',
  templateUrl: './connexion-user.component.html',
  styleUrls: ['./connexion-user.component.scss']
})
export class ConnexionUserComponent implements OnInit {

  user: User = {};

  constructor(private connexionService: ConnexionService, public route: Router) { }

  onSubmit(): void {

    // //post to restAPI
    this.connexionService.connectUser(this.user).subscribe(
      (data) => console.log(data),
      (error: any) => console.log(error),
      () => console.log("Succesfully acces User to database")
    );

    //redirection vers create-tournoi
    this.redirection();
  }

  ngOnInit(): void {
    // this.evenementService.getEvenements().subscribe(
    //   (data) => console.table(data)
    // );
  }

  //route
  redirection(): void {
    this.route.navigate(['/connexion-user']);
  }

}
