import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist, WishlistDocument } from './schemas/wishlist.schema';

@Injectable()
export class WishlistService {

  constructor(
    @InjectModel(Wishlist.name) private readonly wishModel:Model<WishlistDocument>,
    @InjectModel(User.name) private readonly userModel:Model<UserDocument>,
    ){

    }

  async createWishlist(data:any) {
    const wishlist = await this.wishModel.create(data)
    await this.userModel.findByIdAndUpdate({_id:data.userId},{$set:{wishlistId:wishlist._id}})
    return ;
  }

  findWishlistWithProducts(id: any){
    return this.wishModel.findById(id).populate({path:'productIds', populate:{path:'category'}});
  }

  addProductToWishlist(data:any) {
    return 'This action adds a new wishlist';
  }

  findAll() {
    return `This action returns all wishlist`;
  }

  findOne(id: any){
    return this.wishModel.findById(id).exec();
  }

  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return `This action updates a #${id} wishlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} wishlist`;
  }
}
