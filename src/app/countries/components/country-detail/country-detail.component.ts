import { Component, OnInit, PipeTransform } from '@angular/core';
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
  leagues: ILeague[];

  constructor(private _service: CountryService,
    private _leagueService: LeagueService,
    private _clubService: ClubService,
    private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'] ?? throwError("id query parameter couldn't be retrieved");
    this.getCountry();

    this._leagueService.getByCountry(this.id).subscribe(
      result => this.leagues = result,
      error => console.log(error),
      () => this.leagues.forEach(league => this._clubService.getByLeague(league.id).subscribe(
        clubs => league.clubs = clubs,
        err => console.log("error fetching clubs for league " + league.id, err)
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

  search(leagueId: number, text: string, pipe: PipeTransform): IClub[] {
    const league = this.leagues.find(league => league.id === leagueId);
    return league.clubs.filter(club => {
      const term = text.toLowerCase();
      return club.name.toLowerCase().includes(term)
    });
  }
}
