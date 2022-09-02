import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class CreateProductDto {
    @ApiProperty({example: 'Bocina xb1'})
    @IsNotEmpty({message:'El nombre es requerido'})
    name: string;

    @ApiProperty({example: 'Inalambrica con bluetooth'})
    @IsNotEmpty({message:'La descripcion es requerido'})
    description: string;

    // @ApiProperty({example: 'bosina.jpg'})
    // @IsNotEmpty({message:'La imagen es requerido'})
    // img: string;

    @ApiProperty({example: 49.90})
    @IsNotEmpty({message:'El precio es requerido'})
    @IsNumber()
    price: number;

    @ApiProperty({example: 100})
    @IsNotEmpty({message:'El stock es requerido'})
    @IsInt()
    stock: number;

    // @ApiProperty({example: '11025784'})
    // @IsNotEmpty({message:'La categoria es requerido'})
    // category: string

    // @ApiProperty({example: '10879662'})
    // @IsNotEmpty({message:'La marca es requerido'})
    // brand: string;
}
