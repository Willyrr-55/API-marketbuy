import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Response } from 'express';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(res: Response, createOrderDto: CreateOrderDto): Promise<void>;
    findAll(res: Response): Promise<void>;
    findOne(res: Response, id: string): Promise<void>;
    update(res: Response, id: string, updateOrderDto: UpdateOrderDto): Promise<void>;
}
