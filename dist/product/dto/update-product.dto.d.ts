import { CreateProductDto } from './create-product.dto';
declare const UpdateProductDto_base: import("@nestjs/common").Type<Omit<CreateProductDto, "files">>;
export declare class UpdateProductDto extends UpdateProductDto_base {
    status: boolean;
}
export {};
