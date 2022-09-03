import { OmitType, ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends OmitType(CreateProductDto, ['files'] as const){
    @ApiProperty({example:'true'})
    @IsBoolean({message:'El estado no es válido'})
    status:boolean;

}
