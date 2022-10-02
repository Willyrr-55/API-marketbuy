/// <reference types="multer" />
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { CloudinaryService } from '../cloudinary/cloudinary/cloudinary.service';
import { ProductToOrderI } from '../order/interfaces/product-to-order.interface';
import mongoose from 'mongoose';
export declare class ProductService {
    private readonly productModel;
    private cloudinaryService;
    constructor(productModel: Model<ProductDocument>, cloudinaryService: CloudinaryService);
    create(createProductDto: CreateProductDto): Promise<Product & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    filterProduct(filterProductDto: FilterProductDto): Promise<Product[]>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<Product & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    changeStatus(id: string, status: boolean): Promise<Product & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    updateImages(images: Express.Multer.File[]): Promise<(import("cloudinary").UploadApiResponse | import("cloudinary").UploadApiErrorResponse)[]>;
    getProductsByIds(ids: string[]): Promise<(Product & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    changeStockProducts(products: ProductToOrderI[]): Promise<import("mongodb").UpdateResult[]>;
}
