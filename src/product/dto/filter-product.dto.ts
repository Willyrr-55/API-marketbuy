import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsOptional } from "class-validator";

export class FilterProductDto{
    @ApiProperty({example:'630ec2ad8d3c0d386fbfeafb',required:false})
    @IsOptional()
    @IsMongoId()
    readonly _id?:string;

    @ApiProperty({example: 50,required:false})
    @IsOptional()
    readonly stock?:number;

    @ApiProperty({example:'bosina',required:false})
    @IsOptional()
    readonly name?:string;

    @ApiProperty({example:'technology',required:false})
    @IsOptional()
    readonly category?:string;

    @ApiProperty({example:'sony',required:false})
    @IsOptional()
    readonly brand?:string;
}