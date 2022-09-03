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
exports.BrandService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cloudinary_service_1 = require("../cloudinary/cloudinary/cloudinary.service");
const brand_schema_1 = require("./schemas/brand.schema");
let BrandService = class BrandService {
    constructor(brandModel, cloudinaryService) {
        this.brandModel = brandModel;
        this.cloudinaryService = cloudinaryService;
    }
    async create(createBrandDto) {
        return this.brandModel.create(createBrandDto);
    }
    async findAll() {
        return this.brandModel.find();
    }
    async findOne(id) {
        return this.brandModel.findOne({ _id: id });
    }
    async update(id, updateBrandDto) {
        return this.brandModel.findOneAndUpdate({ _id: id }, updateBrandDto, {
            new: true
        });
    }
    async updateImage(images) {
        const urlImages = await Promise.all(images.map((file) => this.cloudinaryService.uploadImage(file)));
        return urlImages;
    }
    async changeStatus(id, status) {
        return this.brandModel.findOneAndUpdate({ _id: id }, { $set: { status } });
    }
};
BrandService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(brand_schema_1.Brand.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, cloudinary_service_1.CloudinaryService])
], BrandService);
exports.BrandService = BrandService;
//# sourceMappingURL=brand.service.js.map