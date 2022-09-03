"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schemas_1 = require("./schemas/order.schemas");
const product_service_1 = require("../product/product.service");
let OrderService = class OrderService {
    constructor(orderModel, productService) {
        this.orderModel = orderModel;
        this.productService = productService;
    }
    async create(createOrderDto) {
        const productsFromReq = createOrderDto.products;
        const idsProducts = productsFromReq.map(p => p.idProduct);
        const products = await this.productService.getProductsByIds(idsProducts);
        const productsToOrder = products.map((p) => {
            const obj = {};
            const quantity = productsFromReq === null || productsFromReq === void 0 ? void 0 : productsFromReq.find((v) => v.idProduct == p._id.toString());
            obj.photo = p.photos[0].url;
            obj.quantity = quantity.quantity;
            obj.total = +(obj.quantity * p.price).toFixed(2);
            obj.idProduct = p._id;
            return obj;
        });
        let totalOrder = 0;
        productsToOrder.forEach((p) => {
            totalOrder += p.total;
        });
        createOrderDto.total = +(totalOrder).toFixed(2);
        createOrderDto.products = productsToOrder;
        await this.orderModel.create(createOrderDto);
        return this.productService.changeStockProducts(productsToOrder);
    }
    findAll() {
        return this.orderModel.find().populate({
            path: 'products.idProduct',
            model: 'Product',
            select: '-_id name description'
        });
    }
    findOne(id) {
        return this.orderModel.findOne({ _id: id }).populate({
            path: 'products.idProduct',
            model: 'Product',
            select: '-_id name description'
        });
    }
    update(id, updateOrderDto) {
        return this.orderModel.findOneAndUpdate({ _id: id }, updateOrderDto, { new: true });
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schemas_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        product_service_1.ProductService])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map