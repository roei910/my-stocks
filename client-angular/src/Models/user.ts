import { WatchingStock } from "./watching-stock";

export class User {
    id!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    watchingStocksByListName!: {
        [listName: string] : {
            [stockSymbol: string]: WatchingStock
        }
    }
}