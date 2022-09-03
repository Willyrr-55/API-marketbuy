import mongoose, { Document } from 'mongoose';
import { Brand } from 'src/brand/schemas/brand.schema';
import { Category } from 'src/category/schemas/category.schema';
import { PhotoI } from 'src/interfaces/photo.interface';
export declare type ProductDocument = Product & Document;
export declare class Product {
    name: string;
    description: string;
    photos: PhotoI[];
    price: number;
    stock: number;
    category: Category;
    brand: Brand;
    status: boolean;
}
export declare const ProductSchema: mongoose.Schema<Product, mongoose.Model<Product, any, any, any, any>, {}, {}, {}, {}, "type", Product>;
