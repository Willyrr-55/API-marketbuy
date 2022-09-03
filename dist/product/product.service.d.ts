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
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { CloudinaryService } from '../cloudinary/cloudinary/cloudinary.service';
import { ProductToOrderI } from '../order/interfaces/product-to-order.interface';
export declare class ProductService {
    private readonly productModel;
    private cloudinaryService;
    constructor(productModel: Model<ProductDocument>, cloudinaryService: CloudinaryService);
    create(createProductDto: CreateProductDto): Promise<Product & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    filterProduct(filterProductDto: FilterProductDto): Promise<Product[]>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<Product & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    changeStatus(id: string, status: boolean): Promise<Product & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateImages(images: Express.Multer.File[]): Promise<(import("cloudinary").UploadApiResponse | import("cloudinary").UploadApiErrorResponse)[]>;
    getProductsByIds(ids: string[]): Promise<(Product & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    changeStockProducts(products: ProductToOrderI[]): Promise<import("mongodb").UpdateResult[]>;
}
