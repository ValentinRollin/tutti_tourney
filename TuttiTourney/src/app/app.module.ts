import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateEvenementComponent } from './create-evenement/create-evenement.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, NgModel } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateTournoiComponent } from './create-tournoi/create-tournoi.component';
import { CreateEquipeComponent } from './create-equipe/create-equipe.component';
import { ShowTournoiComponent } from './show-tournoi/show-tournoi.component';
import { ShowEvenementsComponent } from './show-evenements/show-evenements.component';
import { OrganisationTournoiComponent } from './organisation-tournoi/organisation-tournoi.component';
import { ShowPouleComponent } from './show-poule/show-poule.component';
import { CreateUserComponent } from './create-user/create-user.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateEvenementComponent,
    NavbarComponent,
    CreateTournoiComponent,
    CreateEquipeComponent,
    ShowTournoiComponent,
    ShowEvenementsComponent,
    OrganisationTournoiComponent,
    ShowPouleComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
