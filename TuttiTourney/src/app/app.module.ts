import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateEvenementComponent } from './create-evenement/create-evenement.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, NgModel } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ShowEventComponent } from './show-event/show-event.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateEvenementComponent,
    NavbarComponent,
    ShowEventComponent
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
