import mongoose, { Document } from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';
import { User } from 'src/users/schemas/user.schema';
export declare type WishlistDocument = Wishlist & Document;
export declare class Wishlist {
    userId: User;
    productIds: Product;
}
export declare const WishlistSchema: mongoose.Schema<Wishlist, mongoose.Model<Wishlist, any, any, any, any>, {}, {}, {}, {}, "type", Wishlist>;
