import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsOptional } from "class-validator";

export class FilterUserDto{
    @ApiProperty({example:'630ec2ad8d3c0d386fbfeafb',required:false})
    @IsOptional()
    @IsMongoId()
    readonly _id?:string;

    @ApiProperty({example:'example@email.com',required:false})
    @IsOptional()
    readonly email?:string;

    @ApiProperty({example:'Steven Lopez',required:false})
    @IsOptional()
    readonly full_name?:string;
}