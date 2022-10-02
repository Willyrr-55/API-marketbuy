/// <reference types="multer" />
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Response, Request } from 'express';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { FilterBrandDto } from './dto/filter-brand.dto';
export declare class BrandController {
    private readonly brandService;
    constructor(brandService: BrandService);
    create(req: Request, res: Response, createBrandDto: CreateBrandDto, files: Array<Express.Multer.File>): Promise<void>;
    findAll(): Promise<import("./schemas/brand.schema").Brand[]>;
    findOne(id: string): Promise<import("./schemas/brand.schema").Brand>;
    update(res: Response, id: string, updateBrandDto: UpdateBrandDto): Promise<void>;
    changeStatus(res: Response, id: string, status: boolean): Promise<void>;
    changePhoto(res: Response, id: string, files: Array<Express.Multer.File>): Promise<void>;
    filterbrands(filterBrandDto: FilterBrandDto): Promise<import("./schemas/brand.schema").Brand[]>;
}
