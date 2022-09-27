import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsOptional } from "class-validator";

export class FilterCategoryDto{
    @ApiProperty({example:'630ec2ad8d3c0d386fbfeafb',required:false})
    @IsOptional()
    @IsMongoId()
    readonly _id?:string;

    @ApiProperty({example:'sony',required:false})
    @IsOptional()
    readonly name?:string;

    @ApiProperty({example:'tecnologia',required:false})
    @IsOptional()
    readonly description?:string;


    @ApiProperty({example: true,required:false})
    @IsOptional()
    readonly status?:boolean;
}