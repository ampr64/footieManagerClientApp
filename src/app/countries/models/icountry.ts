export interface ICountry {
    id: number;
    name: string;
    continentId: number;
    isoCode?: string | null;
    flagImageUrl?: string | null;
}
