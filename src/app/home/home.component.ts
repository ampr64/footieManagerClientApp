import { Component, OnInit } from '@angular/core';
import { ContinentService } from '../continents/continent.service';
import { IContinent } from '../continents/models/icontinent';
import { CountryService } from '../countries/country.service';
import { ICountry } from '../countries/models/icountry';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = "Home";
  continents: IContinent[];
  countries: ICountry[];

  constructor(private _continentService: ContinentService, private _countryService: CountryService) { }

  ngOnInit(): void {
    this.listContinents();
    this.listCountries();
  }

  listContinents(): void {
    this._continentService.get().subscribe(
      result => this.continents = result,
      error => console.log(error)
    )
  };

  listCountries(): void {
    this._countryService.get().subscribe(
      result => {this.countries = result; console.log(result);},
      error => console.log(error)
    )
  }

}
