export class StockNotification {
    id?: string;
    stockSymbol!: string;
    userEmail!: string;
    targetPrice!: number;
    isBiggerThanOrEqual!: boolean;
    shouldBeNotified?: boolean;
}