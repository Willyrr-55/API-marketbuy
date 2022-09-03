import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Brand } from 'src/brand/schemas/brand.schema';
import { Category } from 'src/category/schemas/category.schema';
import { PhotoProductI } from '../interfaces/photo-product.interface';

export type ProductDocument = Product & Document; 

@Schema()
export class Product {

    @Prop({required:true})
    name: string;

    @Prop({required:true})
    description: string;
    
    @Prop({required: false})
    photos: PhotoProductI[];

    @Prop({required:true})
    price: number;

    @Prop({required:true})
    stock: number;

    @Prop({required:true,type: mongoose.Schema.Types.ObjectId,ref:'Category'})
    category:Category;

    @Prop({required:true,type: mongoose.Schema.Types.ObjectId, ref: 'Brand'})
    brand:Brand;

    @Prop({default:true})
    status: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
