/// <reference types="multer" />
import { PhotoI } from 'src/interfaces/photo.interface';
export declare class CreateProductDto {
    name: string;
    description: string;
    files: Express.Multer.File[];
    price: number;
    stock: number;
    photos: PhotoI[];
    category: string;
    brand: string;
}
