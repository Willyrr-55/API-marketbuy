import { CreateCategoryDto } from './create-category.dto';
declare const UpdateCategoryDto_base: import("@nestjs/common").Type<Omit<CreateCategoryDto, "files">>;
export declare class UpdateCategoryDto extends UpdateCategoryDto_base {
    status: boolean;
}
export {};
