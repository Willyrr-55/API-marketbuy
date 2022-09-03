import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ProductToOrderI } from '../interfaces/product-to-order.interface';

export type OrderDocument = Order & Document; 

@Schema()
export class Order {

    @Prop()
    names:string;

    @Prop()
    last_name:string;

    @Prop()
    phone:string;

    @Prop()
    address:string;

    @Prop()
    department:string;

    @Prop()
    municipality:string;

    @Prop()
    aditional_info:string;

    @Prop()
    card_number:string;

    @Prop()
    expiration_date:string;

    @Prop()
    cvv:string;

    @Prop()
    products:ProductToOrderI[]

    @Prop()
    total:number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);