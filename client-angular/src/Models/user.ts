import { Share } from "./share";

export class User {
    id!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    shares!: Share[];
    watchingSymbols!: {
        [listName: string] : string[];
    }
}