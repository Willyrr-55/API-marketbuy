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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_schema_1 = require("./schemas/product.schema");
const cloudinary_service_1 = require("../cloudinary/cloudinary/cloudinary.service");
const mongoose_3 = require("mongoose");
const photo_interface_1 = require("../interfaces/photo.interface");
let ProductService = class ProductService {
    constructor(productModel, cloudinaryService) {
        this.productModel = productModel;
        this.cloudinaryService = cloudinaryService;
    }
    async create(createProductDto) {
        return this.productModel.create(createProductDto);
    }
    async findAll() {
        return this.productModel.find().populate('category').populate('brand');
    }
    async findOne(id) {
        return this.productModel.findOne({ _id: { $in: id } }).populate('category').populate('brand');
        ;
    }
    async filterProduct(filterProductDto) {
        console.log(filterProductDto);
        let query = [];
        let category;
        let brand;
        if (filterProductDto._id) {
            query.push({ _id: filterProductDto._id });
        }
        if (filterProductDto.stock) {
            if (filterProductDto.stock == 1) {
                console.log('mayor');
                query.push({ stock: { $gt: 1 } });
            }
            else if (filterProductDto.stock == 0) {
                console.log('menor');
                query.push({ stock: { $lt: 1 } });
            }
        }
        if (filterProductDto.name) {
            query.push({ name: new RegExp(filterProductDto.name, 'i') });
        }
        if (mongoose_3.default.isValidObjectId(filterProductDto.category)) {
            category = { category: filterProductDto.category };
            query.push({ category: filterProductDto.category });
        }
        if (mongoose_3.default.isValidObjectId(filterProductDto.brand)) {
            brand = { brand: filterProductDto.brand };
            query.push({ brand: filterProductDto.brand });
        }
        if (filterProductDto.status) {
            query.push({ status: filterProductDto.status });
        }
        let product;
        if (query.length >= 2) {
            let status;
            let stock;
            let positionstatus = 0;
            let positionStock = 0;
            query.map(q => {
                if (q.status != undefined) {
                    positionstatus = positionstatus + 1;
                    status = q.status;
                }
                if (q.stock != undefined) {
                    stock = q.stock;
                    positionStock = positionStock + 1;
                }
            });
            if (status != undefined && stock != undefined) {
                product = this.productModel.find({
                    $and: [
                        {
                            $and: query
                        },
                        {
                            $and: [{ status: status }]
                        },
                        {
                            $and: [{ stock: stock }]
                        }
                    ]
                }).populate('category').populate('brand').exec();
                return product;
            }
            if (status != undefined) {
                product = this.productModel.find({
                    $and: [{
                            $and: query
                        }, {
                            $and: [{ status: status }]
                        }]
                }).populate('category').populate('brand').exec();
                return product;
            }
            if (stock != undefined) {
                product = this.productModel.find({
                    $and: [
                        {
                            query
                        },
                        {
                            stock: stock
                        }
                    ]
                }).populate('category').populate('brand').exec();
                return product;
            }
            if (category && brand) {
                product = this.productModel.find({
                    $and: [
                        {
                            $and: [category]
                        },
                        {
                            $and: [brand]
                        },
                    ]
                }).populate('category').populate('brand').exec();
                return product;
            }
            product = this.productModel.find({
                $or: query
            }).populate('category').populate('brand').exec();
            return product;
        }
        else if (query.length == 1) {
            product = this.productModel.find({
                $or: query
            }).populate('category').populate('brand').exec();
            return product;
        }
        else {
            product = this.productModel.find().populate('category').populate('brand').exec();
            return product;
        }
    }
    async update(id, updateProductDto) {
        return this.productModel.findOneAndUpdate({ _id: id }, updateProductDto, {
            new: true
        });
    }
    async changeStatus(id, status) {
        return this.productModel.findOneAndUpdate({ _id: id }, { $set: { status } });
    }
    async updateImages(images) {
        const urlImages = await Promise.all(images.map((file) => this.cloudinaryService.uploadImage(file)));
        return urlImages;
    }
    async getProductsByIds(ids) {
        return this.productModel.find({ _id: { $in: ids } }).exec();
    }
    async changeStockProducts(products) {
        return Promise.all(products.map((p) => {
            return this.productModel.updateOne({ _id: p.idProduct }, { $inc: { stock: -p.quantity } });
        }));
    }
    async addPhoto(id, photo) {
        return this.productModel.findOneAndUpdate({ _id: id }, { $addToSet: { photos: photo } }, {
            new: true
        });
    }
    async deletePhoto(id, photo) {
        const producto = await this.productModel.findOne({ $and: [{ _id: id }] });
        const newProducto = producto.photos.filter(p => p.url != photo.url);
        return this.productModel.findOneAndUpdate({ _id: id }, { photos: newProducto }, {
            new: true
        });
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, cloudinary_service_1.CloudinaryService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map