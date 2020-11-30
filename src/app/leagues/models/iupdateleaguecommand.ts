export interface IUpdateLeagueCommand {
    id: number;
    name: string;
    countryId: number;
    division: number;
    logoImageUrl?: string | null;
}
