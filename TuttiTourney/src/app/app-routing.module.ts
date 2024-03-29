import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEquipeComponent } from './create-equipe/create-equipe.component';
import { CreateEvenementComponent } from './create-evenement/create-evenement.component';
import { CreateTournoiComponent } from './create-tournoi/create-tournoi.component';
import { GererTournoiComponent } from './gerer-tournoi/gerer-tournoi.component';
import { MesTournoisComponent } from './mes-tournois/mes-tournois.component';
import { OrganisationTournoiComponent } from './organisation-tournoi/organisation-tournoi.component';
import { ShowEvenementsComponent } from './show-evenements/show-evenements.component';
import { ShowPouleComponent } from './show-poule/show-poule.component';
import { ShowTournoiComponent } from './show-tournoi/show-tournoi.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ConnexionUserComponent } from './connexion-user/connexion-user.component';
import { TournoisEnCoursComponent } from './tournois-en-cours/tournois-en-cours.component';
import { TournoisFinisComponent } from './tournois-finis/tournois-finis.component';
import { VoirTournoiComponent } from './voir-tournoi/voir-tournoi.component';
//import { NavbarComponent } from './navbar/navbar.component';
import { AppComponent } from './app.component';
import { NextTourComponent } from './next-tour/next-tour.component';

const routes: Routes = [
  { path : '', redirectTo:'/home', pathMatch:'full' },
  { path : 'home', component: ShowEvenementsComponent},
  { path : 'mes-tournois', component: MesTournoisComponent},
  { path : 'tournois-en-cours', component: TournoisEnCoursComponent},
  { path : 'tournois-finis', component: TournoisFinisComponent},

  { path : 'tournois-en-cours/:nomEvenement/:nomTournoi', component: VoirTournoiComponent},
  { path : 'tournois-finis/:nomEvenement/:nomTournoi', component: VoirTournoiComponent},
  { path : 'mes-tournois/gerer/:nomEvenement/:nomTournoi', component: GererTournoiComponent},
  { path : 'mes-tournois/gerer/nextTour/:nomEvenement/:nomTournoi', component: NextTourComponent},
  { path : 'create-evenement', component: CreateEvenementComponent},
  { path : 'create-equipe/:nomEvenement/:nomTournoi', component: CreateEquipeComponent},
  { path : 'create-tournoi', component: CreateTournoiComponent},

  { path: 'evenements', component: ShowEvenementsComponent },
  { path: 'tournois/:nomEvenement', component: ShowTournoiComponent },
  { path: 'organisation/:nomEvenement/:nomTournoi', component: OrganisationTournoiComponent },
  { path: 'poules/:nomEvenement/:nomTournoi', component: ShowPouleComponent },

  { path: 'create-user', component: CreateUserComponent },
  { path: 'connexion-user', component: ConnexionUserComponent },

  //{ path : 'navbar', component: NavbarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
