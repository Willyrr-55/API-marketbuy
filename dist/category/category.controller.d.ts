/// <reference types="multer" />
import { Response, Request } from 'express';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FilterCategoryDto } from './dto/filter-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(req: Request, res: Response, createCategoryDto: CreateCategoryDto, files: Array<Express.Multer.File>): Promise<void>;
    findAll(): Promise<import("./schemas/category.schema").Category[]>;
    findOne(id: string): Promise<import("./schemas/category.schema").Category>;
    update(res: Response, id: string, updateCategoryDto: UpdateCategoryDto): Promise<void>;
    changeStatus(res: Response, id: string, status: boolean): Promise<void>;
    changePhoto(res: Response, id: string, files: Array<Express.Multer.File>): Promise<void>;
    filterCategories(filterCategoryDto: FilterCategoryDto): Promise<import("./schemas/category.schema").Category[]>;
}
