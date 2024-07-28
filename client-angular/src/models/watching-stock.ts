import { Share } from "./share";

export class WatchingStock {
    purchaseGuidToShares!: {
        [purchaseGuid: string]: Share
    };
    note!: string;
}
