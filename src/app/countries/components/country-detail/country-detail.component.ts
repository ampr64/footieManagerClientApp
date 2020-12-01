import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { ClubService } from 'src/app/clubs/club.service';
import { IClub } from 'src/app/clubs/models/iclub';
import { LeagueService } from 'src/app/leagues/league.service';
import { ILeague } from 'src/app/leagues/models/ileague';
import { CountryService } from '../../country.service';
import { ICountry } from '../../models/icountry';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {
  private id: number;
  country: ICountry;
  clubByLeagues: { league: ILeague, clubs: IClub[] }[]; //league: ILeague, clubs: IClub[]];

  constructor(private _service: CountryService,
    private _leagueService: LeagueService,
    private _clubService: ClubService,
    private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'] ?? throwError("id query parameter couldn't be retrieved");
    let leagues: ILeague[];
    
    this.getCountry();
    
    this._leagueService.getByCountry(this.id).subscribe(
      result => leagues = result,
      error => console.log(error),
      () => leagues.forEach(league => this._clubService.getByLeague(league.id).subscribe(
        clubs => this.clubByLeagues.push({league, clubs})
        )
      )
    );
  }

  getCountry(): void {
    this._service.getDetail(this.id).subscribe(
      result => this.country = result,
      error => console.log(error)
    );
  }
}
