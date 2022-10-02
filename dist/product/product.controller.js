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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const swagger_1 = require("@nestjs/swagger");
const parse_id_pipe_1 = require("../utilities/parse-id.pipe");
const filter_product_dto_1 = require("./dto/filter-product.dto");
const jwt_guard_1 = require("../guards/jwt.guard");
const roles_guard_1 = require("../guards/roles.guard");
const platform_express_1 = require("@nestjs/platform-express");
const parse_form_data_json_pipe_1 = require("../pipes/parse-form-data-json.pipe");
const photo_interface_1 = require("../interfaces/photo.interface");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async create(req, res, createProductDto, files) {
        try {
            const images = await this.productService.updateImages(files);
            const photosToProduct = images.map((img) => {
                return { public_id: img.public_id, url: img.url, asset_id: img.asset_id };
            });
            await this.productService.create(Object.assign(Object.assign({}, createProductDto), { photos: photosToProduct }));
            res.status(common_1.HttpStatus.OK).json({ message: 'El producto ha sido creado' });
        }
        catch (error) {
            console.log(error);
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Ocurrió un error al crear el producto' });
        }
    }
    findAll() {
        return this.productService.findAll();
    }
    async findOne(res, id) {
        const product = await this.productService.findOne(id);
        return { product: product };
    }
    filterProducts(filterProductDto) {
        return this.productService.filterProduct(filterProductDto);
    }
    async update(res, id, updateProductDto) {
        try {
            console.log(id);
            await this.productService.update(id, updateProductDto);
            res.status(common_1.HttpStatus.OK).json({ message: `Se ha actualizado el producto` });
        }
        catch (error) {
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: `Ocurrió un error al actualizar el producto` });
        }
    }
    async changeStatus(res, id, status) {
        try {
            console.log(id);
            await this.productService.changeStatus(id, status);
            res.status(common_1.HttpStatus.OK).json({ message: `Se ha ${status ? 'activado' : 'desactivado'} el producto` });
        }
        catch (error) {
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: `Ocurrió un error al ${status ? 'activar' : 'desactivar'} el producto` });
        }
    }
    async changePhoto(res, id, files) {
        try {
            console.log(files);
            const images = await this.productService.updateImages(files);
            const photoToProduct = images.map((img) => {
                return { public_id: img.public_id, url: img.url, asset_id: img.asset_id };
            });
            let product = await this.productService.addPhoto(id, photoToProduct[0]);
            res.status(common_1.HttpStatus.OK).json({ message: `Se ha agregado la imagen al produdcto`, product: product });
        }
        catch (error) {
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: `Ocurrió un error al agregar l aimagen al prodcuto` });
        }
    }
    async deletePhoto(res, id, photo) {
        try {
            console.log(photo);
            let product = await this.productService.deletePhoto(id, photo);
            res.status(common_1.HttpStatus.OK).json({ message: `Se ha eliminado la imagen al producto`, product: product });
        }
        catch (error) {
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: `Ocurrió un error al eliminado l imagen al producto` });
        }
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['admin']),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 5)),
    (0, common_1.Post)('/createProduct'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, common_1.Body)(new parse_form_data_json_pipe_1.ParseFormDataJsonPipe({ except: ['files'] }), new common_1.ValidationPipe())),
    __param(3, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_product_dto_1.CreateProductDto,
        Array]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/getProducts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('/getProduct/:id'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/filterProducts'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_product_dto_1.FilterProductDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "filterProducts", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['admin']),
    (0, common_1.Put)('/updatePro'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Query)('id', parse_id_pipe_1.ParseIdPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['admin']),
    (0, common_1.Put)('/changeStatus'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Query)('id', parse_id_pipe_1.ParseIdPipe)),
    __param(2, (0, common_1.Query)('status', common_1.ParseBoolPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Boolean]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "changeStatus", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['admin']),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 1)),
    (0, common_1.Put)('/addPhoto'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Query)('id', parse_id_pipe_1.ParseIdPipe)),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Array]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "changePhoto", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['admin']),
    (0, common_1.Put)('/deletePhoto'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Query)('id', parse_id_pipe_1.ParseIdPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deletePhoto", null);
ProductController = __decorate([
    (0, common_1.Controller)('product'),
    (0, swagger_1.ApiTags)('Product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map