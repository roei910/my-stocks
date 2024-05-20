import { Share } from "./share";

export class User {
    name!: string;
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