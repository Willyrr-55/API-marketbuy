import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/common").Type<Omit<CreateUserDto, "password">>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    status: boolean;
}
export {};
