import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class Product {
    @IsNotEmpty() public title: string;
    @IsNumber() @IsPositive() public price: number;

    constructor(title: string, price: number) {
        this.title = title;
        this.price = price;
    }
    public getInformation = (): string => `title: ${this.title}, price: $${this.price}`;
}
