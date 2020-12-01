import { ICoach } from 'src/app/coaches/models/icoach';
import { IStadium } from 'src/app/stadiums/models/istadium';

export interface IClub {
    id: number;
    name: string;
    president?: string | null;
    stadium: IStadium;
    leagueId?: number;
    yearFounded?: number;
    trophyCount?: number;
    badgeImageUrl?: string | null;
    squadCount?: number;
    coach?: ICoach;
}
