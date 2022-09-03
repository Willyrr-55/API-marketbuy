import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandSchema } from './schemas/brand.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Brand.name, schema:BrandSchema}]),
    CloudinaryModule,
    AuthModule
  ],
  controllers: [BrandController],
  providers: [BrandService]
})
export class BrandModule {}
