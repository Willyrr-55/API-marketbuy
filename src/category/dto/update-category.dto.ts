import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @ApiProperty({example:'true'})
    @IsBoolean({message:'El estado no es válido'})
    status:boolean;
}
