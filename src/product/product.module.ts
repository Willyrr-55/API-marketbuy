import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User, UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Product.name,schema:ProductSchema},{name:User.name,schema:UserSchema}])
  ],
  controllers: [ProductController],
  providers: [ProductService,JwtService,UsersService]
})
export class ProductModule {}
