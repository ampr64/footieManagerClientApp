export interface NewCountryCommand {
    name: string;
    continentId: number;
    isoCode: string | null;
    flagImageUrl?: string | null;
}