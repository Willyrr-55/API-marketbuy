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
exports.CreateCategoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const photo_interface_1 = require("../../interfaces/photo.interface");
class CreateCategoryDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Tecnologia' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre es requerido' }),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Articulos de tecnologia', required: false }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La descripción es requerido' }),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El status es requerido' }),
    __metadata("design:type", Boolean)
], CreateCategoryDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'array', required: true, items: { type: 'string', format: 'binary' } }),
    __metadata("design:type", Array)
], CreateCategoryDto.prototype, "files", void 0);
exports.CreateCategoryDto = CreateCategoryDto;
//# sourceMappingURL=create-category.dto.js.map