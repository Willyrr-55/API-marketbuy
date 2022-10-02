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
exports.UsersService = void 0;
const bcrypt = require("bcrypt");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const jwt_1 = require("@nestjs/jwt");
let UsersService = class UsersService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async create(createUserDto) {
        const passwordHashed = await this.hasPassword(createUserDto.password);
        createUserDto.password = passwordHashed;
        return this.userModel.create(createUserDto);
    }
    async findAll(filterUserDto) {
        const query = [];
        if (filterUserDto._id) {
            query.push({ _id: filterUserDto._id });
        }
        if (filterUserDto.email) {
            query.push({ email: new RegExp(filterUserDto.email, 'i') });
        }
        if (filterUserDto.full_name) {
            query.push({ full_name: new RegExp(filterUserDto.full_name, 'i') });
        }
        return this.userModel.find({
            $or: query
        }).exec();
    }
    async findOne(filterUserDto) {
        const query = [];
        if (filterUserDto._id) {
            query.push({ _id: filterUserDto._id });
        }
        if (filterUserDto.email) {
            query.push({ email: new RegExp(filterUserDto.email, 'i') });
        }
        if (filterUserDto.full_name) {
            query.push({ full_name: new RegExp(filterUserDto.full_name, 'i') });
        }
        return this.userModel.findOne({
            $or: query
        }).exec();
    }
    async findOneByEmail(email) {
        return this.userModel.findOne({
            email
        }).exec();
    }
    async update(id, updateUserDto) {
        return this.userModel.findOneAndUpdate({ _id: id }, updateUserDto, {
            new: true
        });
    }
    async changeStatus(id, status) {
        return this.userModel.findOneAndUpdate({ _id: id }, { $set: { status } });
    }
    async signUp(signUpDto) {
        const passwordHashed = await this.hasPassword(signUpDto.password);
        signUpDto.password = passwordHashed;
        return this.userModel.create(signUpDto);
    }
    async hasPassword(password) {
        return bcrypt.hash(password, 15);
    }
    async comparePassword(password, passwordUser) {
        return bcrypt.compare(password, passwordUser);
    }
    async generateToken(payload) {
        return this.jwtService.sign(payload);
    }
    async decodeToken(token) {
        const decode = await this.jwtService.verify(token);
        return decode;
    }
    ;
    async revalidarToken(userId) {
        const user = await this.findOne(userId);
        const token = await this.generateToken({ _id: user['_id'], role: user.role });
        return token;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map