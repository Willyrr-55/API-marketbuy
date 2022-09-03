/// <reference types="multer" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary/cloudinary.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand, BrandDocument } from './schemas/brand.schema';
export declare class BrandService {
    private readonly brandModel;
    private cloudinaryService;
    constructor(brandModel: Model<BrandDocument>, cloudinaryService: CloudinaryService);
    create(createBrandDto: CreateBrandDto): Promise<Brand>;
    findAll(): Promise<Brand[]>;
    findOne(id: string): Promise<Brand>;
    update(id: string, updateBrandDto: UpdateBrandDto): Promise<Brand & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateImage(images: Express.Multer.File[]): Promise<(import("cloudinary").UploadApiResponse | import("cloudinary").UploadApiErrorResponse)[]>;
    changeStatus(id: string, status: boolean): Promise<Brand & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
