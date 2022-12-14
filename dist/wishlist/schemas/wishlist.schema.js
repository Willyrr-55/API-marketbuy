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
exports.WishlistSchema = exports.Wishlist = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_schema_1 = require("../../product/schemas/product.schema");
const user_schema_1 = require("../../users/schemas/user.schema");
let Wishlist = class Wishlist {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], Wishlist.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: [mongoose_2.default.Schema.Types.ObjectId], ref: 'Product' }),
    __metadata("design:type", product_schema_1.Product)
], Wishlist.prototype, "productIds", void 0);
Wishlist = __decorate([
    (0, mongoose_1.Schema)()
], Wishlist);
exports.Wishlist = Wishlist;
exports.WishlistSchema = mongoose_1.SchemaFactory.createForClass(Wishlist);
//# sourceMappingURL=wishlist.schema.js.map