import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CategoryDocument = Category & Document; 

@Schema()
export class Category {

    @Prop({required:true})
    name: string;

    @Prop({required:true})
    description: string;

    @Prop({default:true})
    status: boolean;

    @Prop({required:true})
    photo: Photo[];
}

interface Photo {
    asset_id:string,
    public_id:string,
    url:string
}

export const CategorySchema = SchemaFactory.createForClass(Category);
