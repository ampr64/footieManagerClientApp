import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { NgxFlagIconCssModule } from 'ngx-flag-icon-css';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ClubListComponent } from './clubs/components/club-list/club-list.component';
import { ClubDetailComponent } from './clubs/components/club-detail/club-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StadiumDetailComponent } from './stadiums/components/stadium-detail/stadium-detail.component';
import { StadiumListComponent } from './stadiums/components/stadium-list/stadium-list.component';
import { NavbarComponent } from './common/components/navbar/navbar.component';
import { CountryDetailComponent } from './countries/components/country-detail/country-detail.component';
import { PlayerCardComponent } from './players/components/player-card/player-card.component';
import { ClubSquadComponent } from './clubs/components/club-squad/club-squad.component';
import { CoachCardComponent } from './coaches/components/coach-card/coach-card.component';
import { StadiumCardComponent } from './stadiums/components/stadium-card/stadium-card.component';
import { FreeAgentListComponent } from './players/components/free-agent-list/free-agent-list.component';
import { PlayerFormComponent } from './players/components/player-form/player-form.component';
import { CoachFormComponent } from './coaches/components/coach-form/coach-form.component';
import { ClubFormComponent } from './clubs/components/club-form/club-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClubListComponent,
    ClubDetailComponent,
    StadiumDetailComponent,
    StadiumListComponent,
    NavbarComponent,
    CountryDetailComponent,
    PlayerCardComponent,
    ClubSquadComponent,
    CoachCardComponent,
    StadiumCardComponent,
    FreeAgentListComponent,
    PlayerFormComponent,
    CoachFormComponent,
    ClubFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    NgbModule,
    NgxFlagIconCssModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
