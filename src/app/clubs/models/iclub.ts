export interface IClub {
    id?: number;
    name?: string | null;
    president?: string | null;
    stadium?: StadiumDto;
    leagueId?: number;
    yearFounded?: number;
    trophyCount?: number;
    badgeImageUrl?: string | null;
    squadCount?: number;
    coach?: CoachDto;
}
