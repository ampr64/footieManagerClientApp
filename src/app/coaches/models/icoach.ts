export interface ICoach {
    id: number;
    firstName: string;
    lastName: string;
    countryId: number;
    birthDate: Date;
    pictureUrl?: string | null;
    clubId?: number | null;
    salary: number;
}
