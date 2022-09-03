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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const swagger_1 = require("@nestjs/swagger");
const log_in_dto_1 = require("./dto/log-in.dto");
const filter_user_dto_1 = require("./dto/filter-user.dto");
const sign_up_dto_1 = require("./dto/sign-up.dto");
const parse_id_pipe_1 = require("../utilities/parse-id.pipe");
const jwt_guard_1 = require("../guards/jwt.guard");
const roles_guard_1 = require("../guards/roles.guard");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(res, createUserDto) {
        try {
            await this.usersService.create(createUserDto);
            res.status(common_1.HttpStatus.OK).json({ message: 'El usuario ha sido creado' });
        }
        catch (error) {
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Ocurrió un error al crear el usuario' });
        }
    }
    findAll(filtersUserDto) {
        return this.usersService.findAll(filtersUserDto);
    }
    findOne(filtersUserDto) {
        return this.usersService.findOne(filtersUserDto);
    }
    async update(res, id, updateUserDto) {
        try {
            await this.usersService.update(id, updateUserDto);
            res.status(common_1.HttpStatus.OK).json({ message: `Se ha actualizado el usuario` });
        }
        catch (error) {
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: `Ocurrió un error al actualizar el usuario` });
        }
    }
    async changeStatus(res, id, status) {
        try {
            await this.usersService.changeStatus(id, status);
            res.status(common_1.HttpStatus.OK).json({ message: `Se ha ${status ? 'activado' : 'desactivado'} el usuario` });
        }
        catch (error) {
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: `Ocurrió un error al ${status ? 'activar' : 'desactivar'} el usuario` });
        }
    }
    async logIn(res, loginData) {
        try {
            const user = await this.usersService.findOneByEmail(loginData.email);
            if (!user) {
                res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    message: 'Email o contraseña incorrectos'
                });
                return;
            }
            const matchPassword = await this.usersService.comparePassword(loginData.password, user.password);
            if (!matchPassword) {
                res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    message: 'Email o contraseña incorrectos'
                });
                return;
            }
            const token = await this.usersService.generateToken({ _id: user['_id'], role: user.role });
            res.status(common_1.HttpStatus.OK).json({
                message: 'Has iniciado sesión correctamente',
                token
            });
        }
        catch (error) {
            console.log(error);
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Ocurrió un error al iniciar sesión' });
        }
    }
    async signUp(res, createUserDto) {
        try {
            const user = await this.usersService.signUp(createUserDto);
            const token = await this.usersService.generateToken({ _id: user['_id'], role: user.role });
            res.status(common_1.HttpStatus.OK).json({ message: 'Te has registrado correctamente', token });
        }
        catch (error) {
            console.log(error);
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Ocurrió un error al crear el usuario' });
        }
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['admin']),
    (0, common_1.Post)('/createUser'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['admin']),
    (0, common_1.Get)('/getUsers'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_user_dto_1.FilterUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['admin', 'user']),
    (0, common_1.Get)('/detailUser'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_user_dto_1.FilterUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['admin', 'user']),
    (0, common_1.Put)('/updateUser'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Query)('id', parse_id_pipe_1.ParseIdPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
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
], UsersController.prototype, "changeStatus", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, log_in_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "logIn", null);
__decorate([
    (0, common_1.Post)('/signUp'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, sign_up_dto_1.SignUpDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signUp", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiTags)('User'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map