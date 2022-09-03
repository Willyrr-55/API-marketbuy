import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type BrandDocument = Brand & Document; 

@Schema()
export class Brand {

    @Prop({required:true})
    name: string;

    @Prop({required:true})
    description: string;

    @Prop({default:true})
    status: boolean;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
