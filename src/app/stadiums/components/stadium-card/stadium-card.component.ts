import { Component, Input, OnInit } from '@angular/core';
import { IStadium } from '../../models/istadium';

@Component({
  selector: 'app-stadium-card',
  templateUrl: './stadium-card.component.html',
  styleUrls: ['./stadium-card.component.css']
})
export class StadiumCardComponent implements OnInit {
  @Input() stadium: IStadium;

  constructor() { }

  ngOnInit(): void {
  }

}
