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
exports.FilterProductDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class FilterProductDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '630ec2ad8d3c0d386fbfeafb', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], FilterProductDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50, required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilterProductDto.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'bosina', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterProductDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '6313a10044f8b363d9df30b2', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterProductDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '6313a2088afab084c523d7df', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterProductDto.prototype, "brand", void 0);
exports.FilterProductDto = FilterProductDto;
//# sourceMappingURL=filter-product.dto.js.map