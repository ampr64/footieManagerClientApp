export interface NewCountryCommand {
    name: string;
    continentId: number;
    flagImageUrl?: string | null;
}