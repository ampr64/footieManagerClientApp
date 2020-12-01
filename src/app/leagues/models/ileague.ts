import { IClub } from 'src/app/clubs/models/iclub';

export interface ILeague {
    id: number;
    name: string;
    countryId: number;
    countryName: string;
    division: number;
    logoImageUrl?: string | null;
    clubs?: IClub[];
}
