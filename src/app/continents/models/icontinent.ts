import { ICountry } from 'src/app/countries/models/icountry';

export interface IContinent {
    id: number;
    name: string;
    countries: ICountry[];
}
