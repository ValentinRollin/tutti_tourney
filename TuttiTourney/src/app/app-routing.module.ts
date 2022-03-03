import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEvenementComponent } from './create-evenement/create-evenement.component';
import { ShowEventComponent } from './show-event/show-event.component';

const routes: Routes = [
  { path : '', redirectTo:'/create-event', pathMatch:'full' },
  { path : 'create-event', component: CreateEvenementComponent},
  { path : 'events', component: ShowEventComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
