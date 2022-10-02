/// <reference types="multer" />
import { PhotoI } from "src/interfaces/photo.interface";
export declare class CreateCategoryDto {
    readonly name: string;
    readonly description: string;
    readonly status: boolean;
    files: Express.Multer.File[];
    photo: PhotoI;
}
