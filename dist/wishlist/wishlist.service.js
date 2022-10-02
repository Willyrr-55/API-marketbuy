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
exports.WishlistService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../users/schemas/user.schema");
const wishlist_schema_1 = require("./schemas/wishlist.schema");
let WishlistService = class WishlistService {
    constructor(wishModel, userModel) {
        this.wishModel = wishModel;
        this.userModel = userModel;
    }
    async createWishlist(data) {
        const wishlist = await this.wishModel.create(data);
        await this.userModel.findByIdAndUpdate({ _id: data.userId }, { $set: { wishlistId: wishlist._id } });
        return;
    }
    findWishlistWithProducts(id) {
        return this.wishModel.findById(id).populate({ path: 'productIds', populate: { path: 'category' } });
    }
    addProductToWishlist(data) {
        return 'This action adds a new wishlist';
    }
    findAll() {
        return `This action returns all wishlist`;
    }
    findOne(id) {
        return this.wishModel.findById(id).exec();
    }
    update(id, updateWishlistDto) {
        return `This action updates a #${id} wishlist`;
    }
    remove(id) {
        return `This action removes a #${id} wishlist`;
    }
};
WishlistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(wishlist_schema_1.Wishlist.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], WishlistService);
exports.WishlistService = WishlistService;
//# sourceMappingURL=wishlist.service.js.map