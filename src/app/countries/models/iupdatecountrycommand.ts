export interface IUpdateCountryCommand {
    id: number;
    name: string;
    continentId: number;
    isoCode?: string | null;
    flagImageUrl?: string | null;
}
