import { Component, Input, OnInit } from '@angular/core';
import { IPlayer } from 'src/app/players/models/iplayer';

@Component({
  selector: 'app-club-squad',
  templateUrl: './club-squad.component.html',
  styleUrls: ['./club-squad.component.css']
})
export class ClubSquadComponent implements OnInit {
  @Input() squad: IPlayer[];

  constructor() { }

  ngOnInit(): void {
  }

}
