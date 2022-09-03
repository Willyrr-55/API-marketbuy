import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty} from "class-validator";
import { PhotoI } from 'src/interfaces/photo.interface';

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

    photos:PhotoI[]

    @ApiProperty({example: '6313a10044f8b363d9df30b2'})
    @IsNotEmpty({message:'La categoria es requerido'})
    @IsMongoId({message:'El ID del mongo es inválido'})
    category: string

    @ApiProperty({example: '6313a2088afab084c523d7df'})
    @IsNotEmpty({message:'La marca es requerido'})
    @IsMongoId({message:'El ID del mongo es inválido'})
    brand: string;
}
