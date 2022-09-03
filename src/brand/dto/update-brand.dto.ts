import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { CreateBrandDto } from './create-brand.dto';

export class UpdateBrandDto extends OmitType(CreateBrandDto,['files'] as const) {
    @ApiProperty({example:'true'})
    @IsBoolean({message:'El estado no es válido'})
    status:boolean;
}
