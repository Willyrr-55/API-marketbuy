/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './schemas/order.schemas';
import { ProductService } from '../product/product.service';
export declare class OrderService {
    private readonly orderModel;
    private productService;
    constructor(orderModel: Model<OrderDocument>, productService: ProductService);
    create(createOrderDto: CreateOrderDto): Promise<import("mongodb").UpdateResult[]>;
    findAll(): import("mongoose").Query<Omit<import("mongoose").Document<unknown, any, OrderDocument> & Order & Document & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[], import("mongoose").Document<unknown, any, OrderDocument> & Order & Document & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, OrderDocument>;
    findOne(id: string): import("mongoose").Query<import("mongoose").Document<unknown, any, OrderDocument> & Order & Document & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Document<unknown, any, OrderDocument> & Order & Document & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, OrderDocument>;
    update(id: string, updateOrderDto: UpdateOrderDto): import("mongoose").Query<import("mongoose").Document<unknown, any, OrderDocument> & Order & Document & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Document<unknown, any, OrderDocument> & Order & Document & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, OrderDocument>;
}
