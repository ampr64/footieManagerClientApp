import { ICoach } from 'src/app/coaches/models/icoach';
import { IPlayer } from 'src/app/players/models/iplayer';
import { IStadium } from 'src/app/stadiums/models/istadium';

export interface IClubDetail {
    id: number;
    name: string;
    president?: string | null;
    stadium?: IStadium | null;
    leagueId?: number;
    yearFounded?: number;
    trophyCount?: number;
    badgeImageUrl?: string | null;
    squadCount?: number;
    coach?: ICoach;
    squad: IPlayer[];
}
