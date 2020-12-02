export interface IClub {
    id: number;
    name: string;
    president?: string | null;
    stadiumId?: number | null;
    leagueId?: number;
    yearFounded: number;
    trophyCount: number;
    badgeImageUrl?: string | null;
    squadCount: number;
    coachId: number;
}
