import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { PhotoI } from "src/interfaces/photo.interface";

export class CreateCategoryDto {

    @ApiProperty({ example: 'Tecnologia'})
    @IsNotEmpty({ message: 'El nombre es requerido' })
    readonly name: string;
  
    @ApiProperty({ example: 'Articulos de tecnologia', required:false})
    @IsNotEmpty({ message: 'La descripción es requerido' })
    readonly description: string;
  
    @ApiProperty({ example: true })
    @IsNotEmpty({ message: 'El status es requerido' })
    readonly status: boolean;

    @ApiProperty({type: 'array', required: true,items:{type:'string',format:'binary'}})
    files: Express.Multer.File[];
  
    photo:PhotoI
    
}
