import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { CountryService } from 'src/app/countries/country.service';
import { ICountry } from 'src/app/countries/models/icountry';
import { IPlayer } from 'src/app/players/models/iplayer';
import { ClubService } from '../../club.service';
import { IClubDetail } from '../../models/iclubdetail';

@Component({
  selector: 'app-club-detail',
  templateUrl: './club-detail.component.html',
  styleUrls: ['./club-detail.component.css']
})
export class ClubDetailComponent implements OnInit {
  club: IClubDetail;
  countries: ICountry[]

  constructor(private _service: ClubService,
    private _countryService: CountryService,
    private router: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.router.snapshot.params['id'] ?? throwError("id query parameter couldn't be retrieved")

    this._service.getDetail(id).subscribe(
      result => this.club = result,
      error => console.log(error)
    );
  }

}
