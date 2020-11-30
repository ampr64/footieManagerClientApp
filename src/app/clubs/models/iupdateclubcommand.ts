export interface IUpdateClubCommand {
    id?: number;
    name: string;
    leagueId: number;
    president?: string | null;
    coachId?: number | null;
    stadiumId: number;
    yearFounded: number;
    trophyCount: number;
    badgeImageUrl?: string | null;
}
