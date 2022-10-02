/// <reference types="multer" />
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response, Request } from 'express';
import { FilterProductDto } from './dto/filter-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(req: Request, res: Response, createProductDto: CreateProductDto, files: Array<Express.Multer.File>): Promise<void>;
    findAll(): Promise<import("./schemas/product.schema").Product[]>;
    findOne(res: Response, id: string): Promise<{
        product: import("./schemas/product.schema").Product;
    }>;
    filterProducts(filterProductDto: FilterProductDto): Promise<import("./schemas/product.schema").Product[]>;
    update(res: Response, id: string, updateProductDto: UpdateProductDto): Promise<void>;
    changeStatus(res: Response, id: string, status: boolean): Promise<void>;
}
