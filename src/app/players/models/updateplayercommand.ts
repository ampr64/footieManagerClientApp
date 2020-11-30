import { Foot } from './iplayer';

export interface UpdatePlayerCommand {
    id: number;
    firstName: string;
    lastName: string;
    countryId: number;
    birthDate: Date;
    pictureUrl?: string | null;
    clubId?: number | null;
    positionId?: Position;
    height: number;
    weight: number;
    salary: number;
    marketValue?: number;
    squadNumber?: number;
    foot: Foot;
}
