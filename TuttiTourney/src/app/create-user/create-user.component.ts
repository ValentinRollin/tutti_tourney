import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user'
import { InscriptionService } from '../services/inscription.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})

export class CreateUserComponent implements OnInit
{

  newUser: User = {};

  constructor(private inscriptionService: InscriptionService, public route: Router) { }

  onSubmit(): void {

    // //post to restAPI
    this.inscriptionService.createUser(this.newUser).subscribe(
      (data) => console.log(data),
      (error: any) => console.log(error),
      () => console.log("Succesfully added User to database")
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
    this.route.navigate(['/create-user']);
  }

}
