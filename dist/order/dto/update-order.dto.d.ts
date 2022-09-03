import { CreateOrderDto } from './create-order.dto';
declare const UpdateOrderDto_base: import("@nestjs/common").Type<Omit<CreateOrderDto, "card_number" | "expiration_date" | "cvv" | "products" | "total">>;
export declare class UpdateOrderDto extends UpdateOrderDto_base {
}
export {};
