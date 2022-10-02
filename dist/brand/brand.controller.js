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
exports.BrandController = void 0;
const common_1 = require("@nestjs/common");
const brand_service_1 = require("./brand.service");
const create_brand_dto_1 = require("./dto/create-brand.dto");
const update_brand_dto_1 = require("./dto/update-brand.dto");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_guard_1 = require("../guards/jwt.guard");
const roles_guard_1 = require("../guards/roles.guard");
const parse_form_data_json_pipe_1 = require("../pipes/parse-form-data-json.pipe");
const parse_id_pipe_1 = require("../utilities/parse-id.pipe");
const filter_brand_dto_1 = require("./dto/filter-brand.dto");
let BrandController = class BrandController {
    constructor(brandService) {
        this.brandService = brandService;
    }
    async create(req, res, createBrandDto, files) {
        try {
            const images = await this.brandService.updateImage(files);
            const photoToBrand = images.map((img) => {
                return { public_id: img.public_id, url: img.url, asset_id: img.asset_id };
            });
            await this.brandService.create(Object.assign(Object.assign({}, createBrandDto), { photo: photoToBrand[0] }));
            res.status(common_1.HttpStatus.OK).json({ message: 'La marca ha sido registrada' });
        }
        catch (error) {
            console.log(error);
            res
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: 'Ocurrió un error al registrar la marca' });
        }
    }
    findAll() {
        return this.brandService.findAll();
    }
    findOne(id) {
        return this.brandService.findOne(id);
    }
    async update(res, id, updateBrandDto) {
        try {
            await this.brandService.update(id, updateBrandDto);
            res.status(common_1.HttpStatus.OK).json({ message: `Se ha actualizado la marca` });
        }
        catch (error) {
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: `Ocurrió un error al actualizar la marca` });
        }
    }
    async changeStatus(res, id, status) {
        try {
            await this.brandService.changeStatus(id, status);
            res.status(common_1.HttpStatus.OK).json({ message: `Se ha ${status ? 'activado' : 'desactivado'} la marca` });
        }
        catch (error) {
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: `Ocurrió un error al ${status ? 'activar' : 'desactivar'} la marca` });
        }
    }
    async changePhoto(res, id, files) {
        try {
            console.log(files);
            const images = await this.brandService.updateImage(files);
            const photoToBrand = images.map((img) => {
                return { public_id: img.public_id, url: img.url, asset_id: img.asset_id };
            });
            await this.brandService.updateBrandPhoto(id, photoToBrand[0]);
            res.status(common_1.HttpStatus.OK).json({ message: `Se ha actualizado la imagen de la marca`, photo: photoToBrand[0] });
        }
        catch (error) {
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: `Ocurrió un error al actualizar la imagen de la marca` });
        }
    }
    filterbrands(filterBrandDto) {
        return this.brandService.filterBrand(filterBrandDto);
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['admin']),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 2)),
    (0, common_1.Post)('/createBrand'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, common_1.Body)(new parse_form_data_json_pipe_1.ParseFormDataJsonPipe({ except: ['file'] }), new common_1.ValidationPipe())),
    __param(3, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_brand_dto_1.CreateBrandDto,
        Array]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/getBrands'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BrandController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/getBrand/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BrandController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['admin']),
    (0, common_1.Put)('/updateBrand'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Query)('id', parse_id_pipe_1.ParseIdPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_brand_dto_1.UpdateBrandDto]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "update", null);
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
], BrandController.prototype, "changeStatus", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['admin']),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 2)),
    (0, common_1.Put)('/changePhoto'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Query)('id', parse_id_pipe_1.ParseIdPipe)),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Array]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "changePhoto", null);
__decorate([
    (0, common_1.Get)('/filterBrands'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_brand_dto_1.FilterBrandDto]),
    __metadata("design:returntype", void 0)
], BrandController.prototype, "filterbrands", null);
BrandController = __decorate([
    (0, common_1.Controller)('brand'),
    (0, swagger_1.ApiTags)('Brand'),
    __metadata("design:paramtypes", [brand_service_1.BrandService])
], BrandController);
exports.BrandController = BrandController;
//# sourceMappingURL=brand.controller.js.map