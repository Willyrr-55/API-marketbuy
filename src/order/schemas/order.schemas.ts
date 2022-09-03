import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ProductToOrderI } from '../interfaces/product-to-order.interface';

export type OrderDocument = Order & Document; 

@Schema()
export class Order {

    @Prop({required:true})
    names:string;

    @Prop({required:true})
    last_name:string;

    @Prop({required:true})
    email:string;

    @Prop({required:true})
    phone:string;

    @Prop({required:true})
    address:string;

    @Prop({required:true})
    department:string;

    @Prop({required:true})
    municipality:string;

    @Prop({required:false,default:null})
    aditional_info:string;

    @Prop({required:true})
    card_number:string;

    @Prop({required:true})
    expiration_date:string;

    @Prop({required:true})
    cvv:string;

    @Prop({required:true})
    products:ProductToOrderI[]

    @Prop({required:true})
    total:number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);