import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class SignUpDto {
    @ApiProperty({example:'example@email.com'})
    @IsEmail({message:'El email es inválido'})
    readonly email:string;

    @ApiProperty({example:'John Doe'})
    @IsNotEmpty({message:'El nombre es requerido'})
    readonly full_name:string;

    @ApiProperty({example:'70670590'})
    @IsNotEmpty({message:'El número de teléfono es requerido'})
    readonly phone_number:string;

    @ApiProperty({example:'johnDoe123'})
    @IsNotEmpty({message:'La contraseña es requerida'})
    password:string;
}
