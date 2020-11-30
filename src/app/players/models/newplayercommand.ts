import { Foot } from './iplayer';

export interface NewPlayerCommand {
    firstName: string;
    lastName: string;
    countryId: number;
    birthDate: Date;
    pictureUrl?: string | null;
    clubId?: number | null;
    position: Position;
    height: number;
    weight: number;
    salary: number;
    marketValue?: number;
    squadNumber?: number;
    foot: Foot;
}
