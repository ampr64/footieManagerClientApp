import { Component, OnInit } from '@angular/core';
import { ClubService } from '../../club.service';
import { IClub } from '../../models/iclub';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.css']
})
export class ClubListComponent implements OnInit {
  clubs: IClub[];

  constructor(private _service: ClubService) { }

  ngOnInit(): void {
    this.listClubs();
  }

  listClubs = () => {
    this._service.get().subscribe(
      result => this.clubs = result,
      error => console.log(error)
    )
  };

}
