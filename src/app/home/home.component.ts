import { Component, OnInit } from '@angular/core';
import { ContinentService } from '../continents/continent.service';
import { IContinent } from '../continents/models/icontinent';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = "Continents";
  continents: IContinent[];

  constructor(private _continentService: ContinentService) { }

  ngOnInit(): void {
    this.listContinents();
  }

  listContinents = () => {
    this._continentService.get().subscribe(
      result => this.continents = result,
      error => console.log(error)
    )
  };

}
