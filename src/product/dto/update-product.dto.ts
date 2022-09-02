import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @ApiProperty({example: 'Bocina xb1'})
    name: string;

    @ApiProperty({example: 'Inalambrica con bluetooth'})
    description: string;

    @ApiProperty({example: 'bosina.jpg'})
    img: string;

    @ApiProperty({example: 49.90})
    price: number;

    @ApiProperty({example: 100})
    stock: number;

    @ApiProperty({example: '11025784'})
    category: string

    @ApiProperty({example: '10879662'})
    brand: string;
}
