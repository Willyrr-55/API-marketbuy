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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Response, Request } from 'express';
import { UsersService } from 'src/users/users.service';
export declare class WishlistController {
    private readonly wishlistService;
    private usersService;
    constructor(wishlistService: WishlistService, usersService: UsersService);
    addProductToWishlist(req: Request, res: Response, createWishlistDto: CreateWishlistDto): Promise<Response<any, Record<string, any>>>;
    findWishlist(req: Request, res: Response, id: string): Promise<Response<any, Record<string, any>>>;
    findAll(): string;
    findOne(id: string): Promise<import("./schemas/wishlist.schema").Wishlist & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateWishlistDto: UpdateWishlistDto): string;
    removeProductTo(req: Request, res: Response, id: string): Promise<string | Response<any, Record<string, any>>>;
    remove(id: string): string;
}
