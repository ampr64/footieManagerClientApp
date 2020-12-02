import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ClubService } from 'src/app/clubs/club.service';
import { IClub } from 'src/app/clubs/models/iclub';
import { CountryService } from 'src/app/countries/country.service';
import { ICountry } from 'src/app/countries/models/icountry';
import { Foot, IPlayer, Position } from '../../models/iplayer';
import { PlayerService } from '../../player.service';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css'],
  providers: [DatePipe]
})
export class PlayerFormComponent implements OnInit {
  id: number;
  redirectionUrl = '/players';
  playerForm: FormGroup;
  isNewMode: boolean;
  clubs: IClub[];
  selectedClub: number | null;
  countries: ICountry[];
  selectedCountry: number | null;
  positionEnum = Position;
  positions = Object.values(Position).filter(x => typeof x === "number");
  footEnum = Foot;
  feet = Object.values(Foot).filter(x => typeof x === "number");
  selectedBirthDate: NgbDate;

  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dateParser: NgbDateParserFormatter,
    private datePipe: DatePipe,
    private _service: PlayerService,
    private _clubService: ClubService,
    private _countryService: CountryService) { }
  private squadNumberValidators = [
    Validators.min(1),
    Validators.max(99)
  ];

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.isNewMode = !this.id;
    this.loadClubs();
    this.loadCountries();
    this.selectedBirthDate = new NgbDate(2000, 1, 1);

    this.playerForm = this.formBuilder.group({
      id: this.id,
      firstName: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      countryId: [null],
      birthDate: [this.selectedBirthDate, Validators.required],
      pictureUrl: '',
      clubId: [0],
      position: this.positions[0],
      height: [140, [Validators.required, Validators.min(140), Validators.max(250)]],
      weight: [45, [Validators.required, Validators.min(45), Validators.max(180)]],
      salary: [null],
      marketValue: [null],
      squadNumber: [null],
      foot: this.feet[0]
    });

    if (!this.isNewMode) {
      this.patchForm()
    }
  }

  loadClubs(): void {
    this._clubService.get().subscribe(
      clubs => this.clubs = clubs,
      error => console.log(error)
    );
  }

  loadCountries(): void {
    this._countryService.get().subscribe(
      countries => { console.log(countries); this.countries = countries },
      error => console.log(error)
    );
  }

  patchForm(): void {
    this._service.getDetail(this.id).subscribe(
      player => {
        this.playerForm.patchValue(player);
        this.selectedBirthDate = this.convertToNgbDate(player.birthDate);
      },
      error => console.log(error),
    );
  }

  convertToNgbDate(date: Date): NgbDate {
    const dateString = this.datePipe.transform(date, 'yyyy-MM-dd');
    return this.dateParser.parse(dateString) as NgbDate;
  }

  submit(): void {
    if (this.playerForm.valid) {
      let player = { ...this.playerForm.value } as IPlayer;
      const formBirthDate = this.playerForm.value.birthDate;
      player.birthDate = new Date(formBirthDate.year, formBirthDate.month - 1, formBirthDate.day);
      if (this.isNewMode) {
        this._service.new(player).subscribe();
      }
      else {
        this._service.update(this.id, player).subscribe();
      }
    }
  }

  cancel(): void {

  }
}
