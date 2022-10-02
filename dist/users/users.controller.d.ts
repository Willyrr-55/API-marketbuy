import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { LoginDto } from './dto/log-in.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { SignUpDto } from './dto/sign-up.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(res: Response, createUserDto: CreateUserDto): Promise<void>;
    findAll(filtersUserDto: FilterUserDto): Promise<import("./schemas/user.schema").User[]>;
    findOne(filtersUserDto: FilterUserDto): Promise<import("./schemas/user.schema").User>;
    update(res: Response, id: string, updateUserDto: UpdateUserDto): Promise<void>;
    changeStatus(res: Response, id: string, status: boolean): Promise<void>;
    logIn(res: Response, loginData: LoginDto): Promise<void>;
    signUp(res: Response, createUserDto: SignUpDto): Promise<void>;
    revalidarToken(res: Response, req: Response): Promise<void>;
}
