import { Component, Input, OnInit } from '@angular/core';
import { ICountry } from 'src/app/countries/models/icountry';
import { Foot, IPlayer, Position } from '../../models/iplayer';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css']
})
export class PlayerCardComponent implements OnInit {
  @Input() player: IPlayer;
  @Input() playerCountry: ICountry;
  positionEnum = Position;
  footEnum = Foot;

  constructor() { }

  ngOnInit(): void {
  }

}
