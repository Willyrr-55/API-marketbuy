import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PhotoI } from 'src/interfaces/photo.interface';

export type BrandDocument = Brand & Document; 

@Schema()
export class Brand {

    @Prop({required:true})
    name: string;

    @Prop({required:true})
    description: string;

    @Prop({default:true})
    status: boolean;

    @Prop({required:false})
    photo: PhotoI[];
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
