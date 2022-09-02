import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ProductDocument = Product & Document; 

@Schema()
export class Product {

    @Prop({required:true})
    name: string;

    @Prop({required:true})
    description: string;

    @Prop({required: false})
    img: string[];

    @Prop({required:true})
    price: number;

    @Prop({required:true})
    stock: number;

    // @Prop({required:true,type: mongoose.Schema.Types.ObjectId,ref:'Category'})
    // category:Category;

    // @Prop({required:true,type: mongoose.Schema.Types.ObjectId, ref: 'Brand', autopopulate: true})
    // brand:Brand;

    @Prop({default:true})
    status: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
