import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document; 

@Schema()
export class User {

    @Prop({required:true,unique:true})
    email:string;

    @Prop({required:true})
    full_name:string;

    @Prop({required:true})
    phone_number:string;

    @Prop({required:true})
    password:string;

    @Prop({default:true})
    status:boolean;

    @Prop({enum:['admin','user'],default:'user'})
    role:string;
}

export const UserSchema = SchemaFactory.createForClass(User);
