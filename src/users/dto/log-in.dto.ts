import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto{
    @ApiProperty({example:'lopezgalvez30@gmail.com'})
    @IsEmail({message:'El email es inválido'})
    readonly email:string;

    @ApiProperty({example:'steven123'})
    @IsNotEmpty({message:'La contraseña es requerida'})
    password:string;
}