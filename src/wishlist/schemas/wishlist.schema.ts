import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';
import { User } from 'src/users/schemas/user.schema';

export type WishlistDocument = Wishlist & Document; 

@Schema()
export class Wishlist {

    @Prop({required:true,type: mongoose.Schema.Types.ObjectId,ref:'User'})
    userId:User;

    @Prop({required:true,type: [mongoose.Schema.Types.ObjectId], ref:'Product'})
    productIds:Product;

}

export const WishlistSchema = SchemaFactory.createForClass(Wishlist);
