import { CreateBrandDto } from './create-brand.dto';
declare const UpdateBrandDto_base: import("@nestjs/common").Type<Omit<CreateBrandDto, "files">>;
export declare class UpdateBrandDto extends UpdateBrandDto_base {
    status: boolean;
}
export {};
