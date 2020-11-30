export interface INewLeagueCommand {
    name: string;
    countryId: number;
    division: number;
    logoImageUrl?: string | null;
}
