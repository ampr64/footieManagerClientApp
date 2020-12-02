import { Component, Input, OnInit } from '@angular/core';
import { CountryService } from 'src/app/countries/country.service';
import { ICountry } from 'src/app/countries/models/icountry';
import { IPlayer } from 'src/app/players/models/iplayer';

@Component({
  selector: 'app-club-squad',
  templateUrl: './club-squad.component.html',
  styleUrls: ['./club-squad.component.css']
})
export class ClubSquadComponent implements OnInit {
  @Input() squad: IPlayer[];
  countries: ICountry[];

  constructor(private _countryService: CountryService) { }

  ngOnInit(): void {
    this._countryService.get().subscribe(
      countries => this.countries = countries,
      error => console.log(error));
  }

  getPlayerCountry(countryId: number): ICountry {
    const country= this.countries?.find(c => c.id === countryId);
    return country;
  }

}
