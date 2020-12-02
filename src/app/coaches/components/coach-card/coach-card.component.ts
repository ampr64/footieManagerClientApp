import { Component, Input, OnInit } from '@angular/core';
import { ICoach } from '../../models/icoach';

@Component({
  selector: 'app-coach-card',
  templateUrl: './coach-card.component.html',
  styleUrls: ['./coach-card.component.css']
})
export class CoachCardComponent implements OnInit {
  @Input() coach: ICoach;

  constructor() { }

  ngOnInit(): void {
  }

}
