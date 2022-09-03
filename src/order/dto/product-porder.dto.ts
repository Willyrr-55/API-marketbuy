import { ApiProperty } from "@nestjs/swagger";

export class ProductOrderDto{
    @ApiProperty({example:'6312bb69e8014ff7f2f96d14'})
    idProduct:string;

    @ApiProperty({example:4})
    quantity:number;
}