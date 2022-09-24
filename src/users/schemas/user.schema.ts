import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ExcludeProperty } from 'nestjs-mongoose-exclude';
import { Wishlist } from 'src/wishlist/schemas/wishlist.schema';

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
    @ExcludeProperty()
    password:string;

    @Prop({required:false, type: mongoose.Schema.Types.ObjectId, ref:'WhishList'})
    wishlistId: Wishlist

    @Prop({default:true})
    status:boolean;

    @Prop({enum:['admin','user'],default:'user'})
    role:string;
}

export const UserSchema = SchemaFactory.createForClass(User);
