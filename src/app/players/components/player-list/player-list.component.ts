import { Component, OnInit } from '@angular/core';
import { ClubService } from 'src/app/clubs/club.service';
import { IClub } from 'src/app/clubs/models/iclub';
import { CountryService } from 'src/app/countries/country.service';
import { ICountry } from 'src/app/countries/models/icountry';
import { IPlayer } from '../../models/iplayer';
import { PlayerService } from '../../player.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  players: IPlayer[];
  clubs: IClub[];
  countries: ICountry[];

  constructor(private _service: PlayerService,
    private _clubService: ClubService,
    private _countryService: CountryService) { }

  ngOnInit(): void {
    this.listPlayers();
    this.listClubs();
    this.listCountries();
  }

  listPlayers(): void {
    this._service.get().subscribe(
      result => this.players = result,
      error => console.log(error)
    )
  };

  listClubs(): void {
    this._clubService.get().subscribe(
      result => this.clubs = result,
      error => console.log(error)
    )
  };

  listCountries(): void {
    this._countryService.get().subscribe(
      result => this.countries = result,
      error => console.log(error)
    )
  };

  getNationalityIsoCode(player: IPlayer): string {
    const country = this.countries.find(c => c.id === player.countryId);
    return country.isoCode;
  }

  getClubName(player: IPlayer): string {
    const club = this.clubs.find(c => c.id === player.clubId);
    return club.name;
  }

  delete(id: number): void {
    this._service.delete(id).subscribe(() => this.listPlayers());
  }
}
