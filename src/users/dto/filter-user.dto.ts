import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class FilterUserDto{
    @ApiProperty({example:'630ec2ad8d3c0d386fbfeafb'})
    @IsOptional()
    readonly _id?:string;

    @ApiProperty({example:'example@email.com'})
    @IsOptional()
    readonly email?:string;

    @ApiProperty({example:'Steven Lopez'})
    @IsOptional()
    readonly full_name?:string;
}