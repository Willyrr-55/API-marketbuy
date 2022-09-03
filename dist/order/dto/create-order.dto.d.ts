import { ProductOrderDto } from "./product-porder.dto";
export declare class CreateOrderDto {
    names: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    department: string;
    municipality: string;
    aditional_info: string;
    card_number: string;
    expiration_date: string;
    cvv: string;
    products: ProductOrderDto[];
    total: number;
}
