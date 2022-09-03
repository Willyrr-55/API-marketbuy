import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsNotEmpty } from "class-validator";
import { ProductOrderDto } from "./product-porder.dto";

export class CreateOrderDto {

    @ApiProperty({example:'Steven'})
    @IsNotEmpty({message:'El nombre es requerido'})
    names:string;

    @ApiProperty({example:'Lopez'})
    @IsNotEmpty({message:'El apellido es requerido'})
    last_name:string;

    @ApiProperty({example:'lopezgalvez30@gmail.com'})
    @IsNotEmpty({message:'El email es requerido'})
    email:string;

    @ApiProperty({example:'70560590'})
    @IsNotEmpty({message:'El número de teléfono es requerido'})
    phone:string;

    @ApiProperty({example:'Colonia Santa Fe'})
    @IsNotEmpty({message:'La dirección es requerida'})
    address:string;

    @ApiProperty({example:'Chalatenango'})
    @IsNotEmpty({message:'El departamento es requerido'})
    department:string;

    @ApiProperty({example:'El Paraiso'})
    @IsNotEmpty({message:'El municipio es requerido'})
    municipality:string;

    @ApiProperty({example:'Despues del desvío de El Tablón',required:false})
    aditional_info:string;

    @ApiProperty({example:'4444444444444444'})
    @IsNotEmpty({message:'El número de la tarjeta es requerido'})
    card_number:string;

    @ApiProperty({example:'06/22',pattern:'/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/'})
    @IsNotEmpty({message:'La fecha de expiración es requerida'})
    expiration_date:string;

    @ApiProperty({example:'344'})
    @IsNotEmpty({message:'El CVV es requerido'})
    cvv:string;

    @ApiProperty({type:[ProductOrderDto]})
    @IsArray()
    @ArrayMinSize(1,{message:'Ingrese al menos un producto'})
    products:ProductOrderDto[]

    @ApiHideProperty()
    total:number;
}
