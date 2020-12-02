export interface IPlayer {
    id: number;
    firstName: string;
    lastName: string;
    countryId: number;
    birthDate: Date;
    age: number;
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

export enum Foot {
    Right = 1,
    Left = 2,
}

export enum Position {
    "Goalkeeper" = 1,
    "Defender" = 2,
    "Midfielder" = 3,
    "Forward" = 4
}