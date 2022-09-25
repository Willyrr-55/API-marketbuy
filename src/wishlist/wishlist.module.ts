import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Wishlist, WishlistSchema } from './schemas/wishlist.schema';
import { AuthModule } from 'src/auth/auth.module';
import { User, UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Wishlist.name, schema:WishlistSchema}]),
    MongooseModule.forFeature([{name:User.name,schema:UserSchema}]),
    AuthModule
  ],
  controllers: [WishlistController],
  providers: [WishlistService]
})
export class WishlistModule {}
