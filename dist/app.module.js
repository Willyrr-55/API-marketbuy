"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("./config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const product_module_1 = require("./product/product.module");
const category_module_1 = require("./category/category.module");
const brand_module_1 = require("./brand/brand.module");
const order_module_1 = require("./order/order.module");
const wishlist_module_1 = require("./wishlist/wishlist.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            mongoose_1.MongooseModule.forRoot(`mongodb+srv://${config_1.default.MONGO_ATLAS_USER}:${config_1.default.MONGO_ATLAS_PASS}@cluster0.lcaax.mongodb.net/marketbuyDB?retryWrites=true&w=majority`),
            product_module_1.ProductModule,
            category_module_1.CategoryModule,
            brand_module_1.BrandModule,
            order_module_1.OrderModule,
            wishlist_module_1.WishlistModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map