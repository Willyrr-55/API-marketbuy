import mongoose, { Document } from 'mongoose';
import { Wishlist } from 'src/wishlist/schemas/wishlist.schema';
export declare type UserDocument = User & Document;
export declare class User {
    email: string;
    full_name: string;
    phone_number: string;
    password: string;
    wishlistId: Wishlist;
    status: boolean;
    role: string;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, "type", User>;
