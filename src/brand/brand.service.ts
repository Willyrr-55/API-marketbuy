import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary/cloudinary.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand, BrandDocument } from './schemas/brand.schema';

@Injectable()
export class BrandService {

  constructor(@InjectModel(Brand.name) private readonly brandModel:Model<BrandDocument>, private cloudinaryService: CloudinaryService){}

  async create(createBrandDto: CreateBrandDto):Promise<Brand> {
    return this.brandModel.create(createBrandDto);
  }

  async findAll(): Promise <Brand[]> {
    return this.brandModel.find();
  }

  async findOne(id: string): Promise <Brand> {
    return this.brandModel.findOne({_id:id});
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    return this.brandModel.findOneAndUpdate({_id:id},updateBrandDto,{
      new:true
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} brand`;
  // }

  async updateImage(images:Express.Multer.File[]){
    const urlImages = await Promise.all(
      images.map((file)=>this.cloudinaryService.uploadImage(file))
    );
    
    return urlImages;
  }

  async changeStatus(id: string,status:boolean) {
    return this.brandModel.findOneAndUpdate({_id:id},{$set:{status}})
  }
}
