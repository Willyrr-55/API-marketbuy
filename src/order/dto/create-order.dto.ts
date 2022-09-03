import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, MinLength } from "class-validator";
import { ProductOrder } from '../classes/product-order.class'
import { ProductToOrderI } from '../interfaces/product-to-order.interface';

export class CreateOrderDto {

    @ApiProperty({example:'Steven'})
    @IsNotEmpty({message:'El nombre es requrido'})
    names:string;

    @ApiProperty({example:'Lopez'})
    @IsNotEmpty({message:'El apellido es requrido'})
    last_name:string;

    @ApiProperty({example:'70560590'})
    @IsNotEmpty({message:'El número de teléfono es requrido'})
    phone:string;

    @ApiProperty({example:'Colonia Santa Fe'})
    @IsNotEmpty({message:'La dirección es requrida'})
    address:string;

    @ApiProperty({example:'Chalatenango'})
    @IsNotEmpty({message:'El departamento es requrido'})
    department:string;

    @ApiProperty({example:'El Paraiso'})
    @IsNotEmpty({message:'El municipio es requrido'})
    municipality:string;

    @ApiProperty({example:'Despues del desvío de El Tablón',required:false})
    aditional_info:string;

    @ApiProperty({example:'4444444444444444'})
    @IsNotEmpty({message:'El número de la tarjeta es requerido'})
    card_number:string;

    @ApiProperty({example:'06/22',pattern:'/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/'})
    @IsNotEmpty({message:'La fecha de expiración es requrida'})
    expiration_date:string;

    @ApiProperty({example:'344'})
    @IsNotEmpty({message:'El CVV es requrido'})
    cvv:string;

    @ApiProperty({type:[ProductOrder]})
    @IsArray()
    @MinLength(1,{message:'Ingrese al menos un producto'})
    products:ProductOrder[] | ProductToOrderI[]

    @ApiHideProperty()
    total:number;
}
