import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClubDetailComponent } from './clubs/components/club-detail/club-detail.component';
import { ClubFormComponent } from './clubs/components/club-form/club-form.component';
import { ClubListComponent } from './clubs/components/club-list/club-list.component';
import { CoachFormComponent } from './coaches/components/coach-form/coach-form.component';
import { CountryDetailComponent } from './countries/components/country-detail/country-detail.component';
import { HomeComponent } from './home/home.component';
import { PlayerFormComponent } from './players/components/player-form/player-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'club/:id', component: ClubDetailComponent },
  { path: 'management/clubs', component: ClubListComponent },
  { path: 'management/new-club', component: ClubFormComponent },
  { path: 'management/edit-club/:id', component: ClubFormComponent },
  { path: 'management/new-coach', component: CoachFormComponent },
  { path: 'management/edit-coach/:id', component: CoachFormComponent },
  { path: 'country/:id', component: CountryDetailComponent },
  { path: 'management/new-player', component: PlayerFormComponent },
  { path: 'management/edit-player/:id', component: PlayerFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
