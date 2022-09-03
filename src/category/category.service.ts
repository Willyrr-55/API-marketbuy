import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary/cloudinary.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()

export class CategoryService {

  constructor(
    @InjectModel(Category.name) private readonly categoryModel:Model<CategoryDocument>,
    private cloudinaryService: CloudinaryService
  ){}

  async create(createCategoryDto: CreateCategoryDto):Promise<Category> {
    return this.categoryModel.create(createCategoryDto);
  }

  async findAll(): Promise <Category[]> {
    return this.categoryModel.find();
  }

  async findOne(id: string): Promise <Category> {
    return this.categoryModel.findOne({_id:id});
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryModel.findOneAndUpdate({_id:id},updateCategoryDto,{
      new:true
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} category`;
  // }
  async updateImage(images:Express.Multer.File[]){
    const urlImage = await Promise.all(
      images.map((file)=>this.cloudinaryService.uploadImage(file))
    );
    
    return urlImage;
  }

  async changeStatus(id: string,status:boolean) {
    return this.categoryModel.findOneAndUpdate({_id:id},{$set:{status}})
  }

 

}
