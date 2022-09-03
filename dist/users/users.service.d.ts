/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { FilterUserDto } from './dto/filter-user.dto';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
export declare class UsersService {
    private readonly userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(filterUserDto: FilterUserDto): Promise<User[]>;
    findOne(filterUserDto: FilterUserDto): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    changeStatus(id: string, status: boolean): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    signUp(signUpDto: SignUpDto): Promise<User>;
    hasPassword(password: string): Promise<string>;
    comparePassword(password: string, passwordUser: string): Promise<boolean>;
    generateToken(payload: any): Promise<string>;
    decodeToken(token: string): Promise<any>;
}
