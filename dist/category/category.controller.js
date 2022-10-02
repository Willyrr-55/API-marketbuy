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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../guards/jwt.guard");
const roles_guard_1 = require("../guards/roles.guard");
const parse_form_data_json_pipe_1 = require("../pipes/parse-form-data-json.pipe");
const category_service_1 = require("./category.service");
const create_category_dto_1 = require("./dto/create-category.dto");
const update_category_dto_1 = require("./dto/update-category.dto");
const parse_id_pipe_1 = require("../utilities/parse-id.pipe");
const filter_category_dto_1 = require("./dto/filter-category.dto");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async create(req, res, createCategoryDto, files) {
        try {
            const images = await this.categoryService.updateImage(files);
            const photoToCategory = images.map((img) => {
                return { public_id: img.public_id, url: img.url, asset_id: img.asset_id };
            });
            await this.categoryService.create(Object.assign(Object.assign({}, createCategoryDto), { photo: photoToCategory[0] }));
            res.status(common_1.HttpStatus.OK).json({ message: 'La categoria ha sido registrada' });
        }
        catch (error) {
            console.log(error);
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Ocurrió un error al registrar la categoria'
            });
        }
    }
    findAll() {
        return this.categoryService.findAll();
    }
    findOne(id) {
        return this.categoryService.findOne(id);
    }
    async update(res, id, updateCategoryDto) {
        try {
            await this.categoryService.update(id, updateCategoryDto);
            res.status(common_1.HttpStatus.OK).json({ message: `Se ha actualizado la categoria` });
        }
        catch (error) {
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: `Ocurrió un error al actualizar la categoria` });
        }
    }
    async changeStatus(res, id, status) {
        try {
            await this.categoryService.changeStatus(id, status);
            res.status(common_1.HttpStatus.OK).json({ message: `Se ha ${status ? 'activado' : 'desactivado'} la categoria` });
        }
        catch (error) {
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: `Ocurrió un error al ${status ? 'activar' : 'desactivar'} la categoria` });
        }
    }
    async changePhoto(res, id, files) {
        try {
            console.log(files);
            const images = await this.categoryService.updateImage(files);
            const photoToBrand = images.map((img) => {
                return { public_id: img.public_id, url: img.url, asset_id: img.asset_id };
            });
            await this.categoryService.updatecategoryPhoto(id, photoToBrand[0]);
            res.status(common_1.HttpStatus.OK).json({ message: `Se ha actualizado la imagen de la categoria`, photo: photoToBrand[0] });
        }
        catch (error) {
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: `Ocurrió un error al actualizar la imagen de la categoria` });
        }
    }
    filterCategories(filterCategoryDto) {
        return this.categoryService.filterCategory(filterCategoryDto);
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['admin']),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 2)),
    (0, common_1.Post)('/createCategory'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, common_1.Body)(new parse_form_data_json_pipe_1.ParseFormDataJsonPipe({ except: ['files'] }), new common_1.ValidationPipe())),
    __param(3, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_category_dto_1.CreateCategoryDto,
        Array]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/getCategories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/getCategory/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['admin']),
    (0, common_1.Put)('/updateCategory'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Query)('id', parse_id_pipe_1.ParseIdPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "update", null);
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
], CategoryController.prototype, "changeStatus", null);
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
], CategoryController.prototype, "changePhoto", null);
__decorate([
    (0, common_1.Get)('/filterCategories'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_category_dto_1.FilterCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "filterCategories", null);
CategoryController = __decorate([
    (0, common_1.Controller)('category'),
    (0, swagger_1.ApiTags)('Category'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map