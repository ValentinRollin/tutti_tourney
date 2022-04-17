import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEquipeComponent } from './create-equipe/create-equipe.component';
import { CreateEvenementComponent } from './create-evenement/create-evenement.component';
import { CreateTournoiComponent } from './create-tournoi/create-tournoi.component';
import { OrganisationTournoiComponent } from './organisation-tournoi/organisation-tournoi.component';
import { ShowEvenementsComponent } from './show-evenements/show-evenements.component';
import { ShowPouleComponent } from './show-poule/show-poule.component';
import { ShowTournoiComponent } from './show-tournoi/show-tournoi.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ConnexionUserComponent } from './connexion-user/connexion-user.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path : '', redirectTo:'/home', pathMatch:'full' },
  { path : 'home', component: ShowEvenementsComponent},
  { path : 'create-evenement', component: CreateEvenementComponent},
  { path : 'create-equipe/:nomEvenement/:nomTournoi', component: CreateEquipeComponent},
  { path : 'create-tournoi', component: CreateTournoiComponent},
  { path: 'evenements', component: ShowEvenementsComponent },
  { path: 'tournois/:nomEvenement', component: ShowTournoiComponent },
  { path: 'organisation/:nomEvenement/:nomTournoi', component: OrganisationTournoiComponent },
  { path: 'poules/:nomEvenement/:nomTournoi', component: ShowPouleComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'connexion-user', component: ConnexionUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
