import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist, WishlistDocument } from './schemas/wishlist.schema';

@Injectable()
export class WishlistService {

  constructor(
    @InjectModel(Wishlist.name) private readonly wishModel:Model<WishlistDocument>
    ){

    }

  create(createWishlistDto: CreateWishlistDto) {
    return 'This action adds a new wishlist';
  }

  addProductToWishlist(createWishlistDto: CreateWishlistDto) {
    return 'This action adds a new wishlist';
  }

  findAll() {
    return `This action returns all wishlist`;
  }

  findOne(id: any): Promise <Wishlist>{
    return this.wishModel.findById(id).exec();
  }

  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return `This action updates a #${id} wishlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} wishlist`;
  }
}
