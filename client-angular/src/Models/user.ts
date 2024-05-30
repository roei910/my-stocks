import { Share } from "./share";

export class User {
    firstName!: string;
    lastName!: string;
    email!: string;
    password?: string;
    lists!: {
        [listName: string] : {
            [stockSymbol: string]: {
                note: string;
                shares: Share[]
            }
        }
    }
}