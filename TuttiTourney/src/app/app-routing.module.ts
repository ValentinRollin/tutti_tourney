import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEquipeComponent } from './create-equipe/create-equipe.component';
import { CreateEvenementComponent } from './create-evenement/create-evenement.component';
import { CreateTournoiComponent } from './create-tournoi/create-tournoi.component';
import { ShowEvenementsComponent } from './show-evenements/show-evenements.component';
import { ShowTournoiComponent } from './show-tournoi/show-tournoi.component';

const routes: Routes = [
  { path : '', redirectTo:'/home', pathMatch:'full' },
  { path : 'home', component: ShowEvenementsComponent},
  { path : 'create-evenement', component: CreateEvenementComponent},
  { path : 'create-equipe', component: CreateEquipeComponent},
  { path : 'create-tournoi', component: CreateTournoiComponent},
  { path: 'evenements', component: ShowEvenementsComponent },
  { path: 'tournois/:nom', component: ShowTournoiComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
