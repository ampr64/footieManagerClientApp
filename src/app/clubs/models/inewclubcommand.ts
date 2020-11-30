export interface INewClubCommand {
    name: string;
    leagueId: number;
    president?: string | null;
    coachId?: number | null;
    stadiumId: number;
    yearFounded: number;
    trophyCount: number;
    badgeImageUrl?: string | null;
}