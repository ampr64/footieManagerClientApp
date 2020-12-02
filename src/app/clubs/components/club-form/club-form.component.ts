import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoachService } from 'src/app/coaches/coach.service';
import { ICoach } from 'src/app/coaches/models/icoach';
import { LeagueService } from 'src/app/leagues/league.service';
import { ILeague } from 'src/app/leagues/models/ileague';
import { IStadium } from 'src/app/stadiums/models/istadium';
import { StadiumService } from 'src/app/stadiums/stadium.service';
import { ClubService } from '../../club.service';
import { IClub } from '../../models/iclub';

@Component({
  selector: 'app-club-form',
  templateUrl: './club-form.component.html',
  styleUrls: ['./club-form.component.css']
})
export class ClubFormComponent implements OnInit {
  id: number;
  redirectionUrl = '/management/clubs';
  clubForm: FormGroup;
  isNewMode: boolean;
  coaches: ICoach[];
  leagues: ILeague[];
  stadiums: IStadium[];


  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _service: ClubService,
    private _coachService: CoachService,
    private _leagueService: LeagueService,
    private _stadiumService: StadiumService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.isNewMode = !this.id;
    this.loadCoaches();
    this.loadLeagues();
    this.loadStadiums();

    this.clubForm = this.formBuilder.group({
      id: this.id,
      name: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(2)]],
      president: ['', [Validators.maxLength(50), Validators.minLength(2)]],
      stadiumId: '',
      leagueId: ['', Validators.required],
      badgeImageUrl: '',
      yearFounded: ['', [Validators.required, Validators.min(0), Validators.max(new Date().getFullYear())]],
      trophyCount: ['', [Validators.required, Validators.min(0)]],
      coachId: ''
    });

    if (!this.isNewMode) {
      this.patchForm();
    }
  }

  loadCoaches(): void {
    this._coachService.getAvailable().subscribe(
      coaches => this.coaches = coaches,
      error => console.log(error)
    );
  }

  loadLeagues(): void {
    this._leagueService.get().subscribe(
      leagues => this.leagues = leagues,
      error => console.log(error)
    );
  }

  loadStadiums(): void {
    this._stadiumService.get().subscribe(
      stadiums => this.stadiums = stadiums,
      error => console.log(error)
    );
  }

  patchForm(): void {
    this._service.getDetail(this.id).subscribe(
      club => { 
        this.clubForm.patchValue(club);
        this.coaches.push(club.coach);
      },
      error => console.log(error),
    );
  }

  submit(): void {
    if (this.clubForm.valid) {
      const club = { ...this.clubForm.value } as IClub;
      if (this.isNewMode) {
        this._service.new(club).subscribe();
      }
      else {
        this._service.update(this.id, club).subscribe();
      }
    }
  }

  cancel(): void {

  }

}
