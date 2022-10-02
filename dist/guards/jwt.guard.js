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
exports.JwtGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("../config");
const users_service_1 = require("../users/users.service");
let JwtGuard = class JwtGuard {
    constructor(jwtService, usersService) {
        this.jwtService = jwtService;
        this.usersService = usersService;
    }
    async canActivate(context) {
        var _a;
        try {
            const req = context.switchToHttp().getRequest();
            const bearerToken = req['headers']['authorization'];
            if (!bearerToken) {
                throw new common_1.UnauthorizedException({ message: 'El token es requerido' });
            }
            const token = (_a = bearerToken.split('Bearer')[1]) === null || _a === void 0 ? void 0 : _a.trim();
            const decode = await this.jwtService.verify(token, { secret: config_1.default.SECRETJWT });
            const user = await this.usersService.findOne({ _id: decode._id });
            if (!user) {
                throw new common_1.BadRequestException({ message: 'El usuario no existe', invalidToken: true });
            }
            req.user = user;
            return true;
        }
        catch (error) {
            console.log(error);
            if (error.name === 'TokenExpiredError') {
                throw new common_1.UnauthorizedException({ message: 'Token expirado' });
            }
            throw new common_1.BadRequestException({ message: 'Token inválido', invalidToken: true });
        }
    }
};
JwtGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService, users_service_1.UsersService])
], JwtGuard);
exports.JwtGuard = JwtGuard;
//# sourceMappingURL=jwt.guard.js.map