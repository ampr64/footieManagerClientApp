import { Component, Input, OnInit } from '@angular/core';
import { Foot, IPlayer, Position } from '../../models/iplayer';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css']
})
export class PlayerCardComponent implements OnInit {
  @Input() player: IPlayer;
  Position: Position;
  Foot: Foot;

  constructor() { }

  ngOnInit(): void {
  }

  getPositionName(value: number): string {
    return Position[value];
  }

  getFootName(value: number): string {
    return Foot[value];
  }

}
