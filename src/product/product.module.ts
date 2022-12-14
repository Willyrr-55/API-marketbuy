import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Product.name,schema:ProductSchema}]),
    CloudinaryModule,
    AuthModule
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports:[ProductService,CloudinaryModule]
})
export class ProductModule {}
