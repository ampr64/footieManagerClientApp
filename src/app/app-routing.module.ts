import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClubDetailComponent } from './clubs/components/club-detail/club-detail.component';
import { ClubListComponent } from './clubs/components/club-list/club-list.component';
import { CountryDetailComponent } from './countries/components/country-detail/country-detail.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'clubs', component: ClubListComponent },
  { path: 'club/:id', component: ClubDetailComponent },
  { path: 'country/:id', component: CountryDetailComponent },
  { path: 'players/club/:clubId', redirectTo: 'clubs' },
  { path: 'player/:id', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
