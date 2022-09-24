import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty} from "class-validator";

export class CreateWishlistDto {

    // @ApiProperty({example: '6313a10044f8b363d9df30b2'})
    // @IsNotEmpty({message:'El id del usuario es requerido'})
    // @IsMongoId({message:'El ID del mongo es inválido'})
    // userId: string

    @ApiProperty({example: '6313a10044f8b363d9df30b2'})
    @IsNotEmpty({message:'Los productos son requeridos'})
    @IsMongoId({message:'El ID del mongo es inválido'})
    productId: string
}
