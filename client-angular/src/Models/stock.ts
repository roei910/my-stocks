export class Stock {
    id!: string;
    name!: string;
    symbol!: string;
    price!: number;
    analystRating?: string;
    updatedTime?: Date;
}