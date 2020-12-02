import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ClubService } from 'src/app/clubs/club.service';
import { IClub } from 'src/app/clubs/models/iclub';
import { CountryService } from 'src/app/countries/country.service';
import { ICountry } from 'src/app/countries/models/icountry';
import { CoachService } from '../../coach.service';
import { ICoach } from '../../models/icoach';

@Component({
  selector: 'app-coach-form',
  templateUrl: './coach-form.component.html',
  styleUrls: ['./coach-form.component.css'],
  providers: [DatePipe]
})
export class CoachFormComponent implements OnInit {
  id: number;
  redirectionUrl = 'management/coaches';
  coachForm: FormGroup;
  isNewMode: boolean;
  clubs: IClub[];
  selectedClub: number | null;
  countries: ICountry[];
  selectedCountry: number | null;
  selectedBirthDate: NgbDate;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dateParser: NgbDateParserFormatter,
    private datePipe: DatePipe,
    private _service: CoachService,
    private _clubService: ClubService,
    private _countryService: CountryService
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.isNewMode = !this.id;
    this.loadAvailableClubs();
    this.loadCountries();

    this.coachForm = this.formBuilder.group({
      id: this.id,
      firstName: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      countryId: [null],
      birthDate: [new NgbDate(2000, 1, 1), Validators.required],
      pictureUrl: '',
      clubId: [0],
      height: [140, [Validators.required, Validators.min(140), Validators.max(250)]],
      weight: [45, [Validators.required, Validators.min(45), Validators.max(180)]],
      salary: [null]
    });

    if (!this.isNewMode) {
      this.patchForm();
    }
  }

  loadAvailableClubs(): void {
    this._clubService.get().subscribe(
      clubs => this.clubs = clubs.filter(x => !x.coachId),
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
      coach => {
        this.coachForm.patchValue(coach);
        this.selectedBirthDate = this.convertToNgbDate(coach.birthDate);
      },
      error => console.log(error),
    );
  }

  convertToNgbDate(date: Date): NgbDate {
    const dateString = this.datePipe.transform(date, 'yyyy-MM-dd');
    return this.dateParser.parse(dateString) as NgbDate;
  }

  submit(): void {
    if (this.coachForm.valid) {
      let coach = { ...this.coachForm.value } as ICoach;
      const formBirthDate = this.coachForm.value.birthDate;
      coach.birthDate = new Date(formBirthDate.year, formBirthDate.month - 1, formBirthDate.day);
      if (this.isNewMode) {
        this._service.new(coach).subscribe();
      }
      else {
        this._service.update(this.id, coach).subscribe();
      }
    }
  }

  return(): void {
    this.router.navigate([this.redirectionUrl]);
  }

}
