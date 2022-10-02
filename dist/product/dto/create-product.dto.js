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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const photo_interface_1 = require("../../interfaces/photo.interface");
class CreateProductDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bocina xb1' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre es requerido' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Inalambrica con bluetooth' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La descripcion es requerido' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'array', required: true, items: { type: 'string', format: 'binary' } }),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "files", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 49.90 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El precio es requerido' }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El stock es requerido' }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '6313a10044f8b363d9df30b2' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La categoria es requerido' }),
    (0, class_validator_1.IsMongoId)({ message: 'El ID del mongo es inválido' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '6313a2088afab084c523d7df' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La marca es requerido' }),
    (0, class_validator_1.IsMongoId)({ message: 'El ID del mongo es inválido' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "brand", void 0);
exports.CreateProductDto = CreateProductDto;
//# sourceMappingURL=create-product.dto.js.map