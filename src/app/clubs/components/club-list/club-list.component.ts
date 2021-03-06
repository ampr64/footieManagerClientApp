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

 listClubs(): void {
    this._service.get().subscribe(
      result => this.clubs = result,
      error => console.log(error)
    )
  };

  delete(id: number): void {
    this._service.delete(id).subscribe(() => this.listClubs());
  }

}
