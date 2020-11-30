export interface IUpdateCountryCommand {
    id: number;
    name: string;
    continentId: number;
    flagImageUrl?: string | null;
}
