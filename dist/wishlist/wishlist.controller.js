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
exports.WishlistController = void 0;
const common_1 = require("@nestjs/common");
const wishlist_service_1 = require("./wishlist.service");
const create_wishlist_dto_1 = require("./dto/create-wishlist.dto");
const update_wishlist_dto_1 = require("./dto/update-wishlist.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../guards/jwt.guard");
const users_service_1 = require("../users/users.service");
let WishlistController = class WishlistController {
    constructor(wishlistService, usersService) {
        this.wishlistService = wishlistService;
        this.usersService = usersService;
    }
    async addProductToWishlist(req, res, createWishlistDto) {
        var _a;
        try {
            const userId = req['user']['_id'];
            const user = await this.usersService.findOne(userId);
            const { productId } = createWishlistDto;
            const wish = await this.wishlistService.findOne(user.wishlistId);
            if (wish) {
                if ((_a = wish.productIds) === null || _a === void 0 ? void 0 : _a.includes(productId)) {
                    return res.status(404).json({
                        message: 'Este producto ya esta en tu lista de Favoritos'
                    });
                }
                wish.productIds.push(productId);
                await wish.save();
                return res.status(200).json({
                    ok: true,
                    message: 'El producto se agrego a tu wishlist'
                });
            }
            await this.wishlistService.createWishlist({ productIds: productId, userId });
            res.status(common_1.HttpStatus.OK).json({ message: 'El producto se agrego a tu wishlist' });
        }
        catch (error) {
            console.log(error);
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Ocurrió un error al agregar el producto a tu Wishlist' });
        }
    }
    async findWishlist(req, res, id) {
        const userId = req['user']['_id'];
        const user = await this.usersService.findOne(userId);
        const wish = await this.wishlistService.findWishlistWithProducts(user.wishlistId);
        if (!wish) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: `No tienes productos agregados a tu wishlist` });
        }
        res.status(common_1.HttpStatus.OK).json({ data: wish });
    }
    findAll() {
        return this.wishlistService.findAll();
    }
    findOne(id) {
        return this.wishlistService.findOne(id);
    }
    update(id, updateWishlistDto) {
        return this.wishlistService.update(+id, updateWishlistDto);
    }
    async removeProductTo(req, res, createWishlistDto, id) {
        try {
            const { productId } = createWishlistDto;
            const userId = req['user']['_id'];
            const user = await this.usersService.findOne(userId);
            const wish = await this.wishlistService.findWishlistWithProducts(user.wishlistId);
            wish.productIds = wish.productIds.filter((product) => product != productId);
            console.log(wish.productIds);
            await wish.save();
            return res.json({
                message: 'El producto se eliminó de tu wishlist'
            });
        }
        catch (error) {
            console.log(error);
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Ocurrió un error al eliminar el producto de tu wishlist' });
        }
        return this.wishlistService.remove(+id);
    }
    remove(id) {
        return this.wishlistService.remove(+id);
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Post)('/addProductToWishlist'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_wishlist_dto_1.CreateWishlistDto]),
    __metadata("design:returntype", Promise)
], WishlistController.prototype, "addProductToWishlist", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('getWishlist'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], WishlistController.prototype, "findWishlist", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WishlistController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WishlistController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_wishlist_dto_1.UpdateWishlistDto]),
    __metadata("design:returntype", void 0)
], WishlistController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Delete)('removeProductToWishlist'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_wishlist_dto_1.CreateWishlistDto, String]),
    __metadata("design:returntype", Promise)
], WishlistController.prototype, "removeProductTo", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WishlistController.prototype, "remove", null);
WishlistController = __decorate([
    (0, common_1.Controller)('wishlist'),
    __metadata("design:paramtypes", [wishlist_service_1.WishlistService, users_service_1.UsersService])
], WishlistController);
exports.WishlistController = WishlistController;
//# sourceMappingURL=wishlist.controller.js.map