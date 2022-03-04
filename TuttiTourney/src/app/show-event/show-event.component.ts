import { Component, OnInit } from '@angular/core';
import { EvenementService } from '../services/evenement.service';

@Component({
  selector: 'app-show-event',
  templateUrl: './show-event.component.html',
  styleUrls: ['./show-event.component.scss']
})
export class ShowEventComponent implements OnInit {

  events !: any[];

  constructor(private eventService: EvenementService) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(
      (data) => this.events = data
    );
  }

  redirection(): void{

  }

}
