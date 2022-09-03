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
exports.CreateOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const product_porder_dto_1 = require("./product-porder.dto");
class CreateOrderDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Steven' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre es requerido' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "names", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Lopez' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El apellido es requerido' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'lopezgalvez30@gmail.com' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El email es requerido' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '70560590' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El número de teléfono es requerido' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Colonia Santa Fe' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La dirección es requerida' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Chalatenango' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El departamento es requerido' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'El Paraiso' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El municipio es requerido' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "municipality", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Despues del desvío de El Tablón', required: false }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "aditional_info", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '4444444444444444' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El número de la tarjeta es requerido' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "card_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '06/22', pattern: '/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La fecha de expiración es requerida' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "expiration_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '344' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El CVV es requerido' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "cvv", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [product_porder_dto_1.ProductOrderDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'Ingrese al menos un producto' }),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "products", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "total", void 0);
exports.CreateOrderDto = CreateOrderDto;
//# sourceMappingURL=create-order.dto.js.map