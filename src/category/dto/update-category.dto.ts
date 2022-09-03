import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends OmitType(CreateCategoryDto, ['files'] as const){
    @ApiProperty({example:'true'})
    @IsBoolean({message:'El estado no es válido'})
    status:boolean;
}
