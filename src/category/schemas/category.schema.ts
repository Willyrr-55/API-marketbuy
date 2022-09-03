import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PhotoI } from 'src/interfaces/photo.interface';

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
    photo: PhotoI[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
