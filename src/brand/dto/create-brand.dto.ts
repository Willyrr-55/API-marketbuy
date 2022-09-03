import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({ example: 'Apple' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  readonly name: string;

  @ApiProperty({ example: 'Empresa tecnologica de alcance mundial' })
  @IsNotEmpty({ message: 'La descripción es requerido' })
  readonly description: string;

  @ApiProperty({ example: true })
  @IsNotEmpty({ message: 'El status es requerido' })
  readonly status: boolean;
}
