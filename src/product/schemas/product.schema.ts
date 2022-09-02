import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { type } from 'os';

export type ProductDocument = Product & Document; 

@Schema()
export class Product {

    @Prop({required:true})
    name: String;

    @Prop({required:true})
    description: String;

    @Prop({required: false})
    img: String;

    @Prop({required:true})
    price: Number;

    @Prop({required:true})
    stock: Number;

    @Prop({required:true})
    category: { type: mongoose.Schema.Types.ObjectId, ref: Category, autopopulate: true};

    @Prop({required:true})
    brand: { type: mongoose.Schema.Types.ObjectId, ref: Brand, autopopulate: true};

    @Prop({default:true})
    status: Boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
