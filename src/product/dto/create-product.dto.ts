import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty} from "class-validator";
import { PhotoProductI } from '../interfaces/photo-product.interface';

export class CreateProductDto {
    @ApiProperty({example: 'Bocina xb1'})
    @IsNotEmpty({message:'El nombre es requerido'})
    name: string;

    @ApiProperty({example: 'Inalambrica con bluetooth'})
    @IsNotEmpty({message:'La descripcion es requerido'})
    description: string;

    @ApiProperty({type: 'array', required: true,items:{type:'string',format:'binary'}})
    files: Express.Multer.File[];

    @ApiProperty({example: 49.90})
    @IsNotEmpty({message:'El precio es requerido'})
    price: number;

    @ApiProperty({example: 100})
    @IsNotEmpty({message:'El stock es requerido'})
    stock: number;

    photos:PhotoProductI[]

    // @ApiProperty({example: '11025784'})
    // @IsNotEmpty({message:'La categoria es requerido'})
    // category: string

    // @ApiProperty({example: '10879662'})
    // @IsNotEmpty({message:'La marca es requerido'})
    // brand: string;
}
