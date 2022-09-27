import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Console } from 'console';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary/cloudinary.service';
import { PhotoI } from 'src/interfaces/photo.interface';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FilterCategoryDto } from './dto/filter-category.dto';
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

  async updatecategoryPhoto(id: string, photo: PhotoI) {
    return this.categoryModel.findOneAndUpdate({_id:id},{photo:photo},{
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

  async filterCategory(filterCategoryDto:FilterCategoryDto): Promise<Category[]>{
    const query = [];

    if(filterCategoryDto._id){
      query.push({_id:filterCategoryDto._id});
    }


    if(filterCategoryDto.name){
      query.push({name:new RegExp(filterCategoryDto.name,'i')});
    }

    if(filterCategoryDto.description){
      query.push({description:new RegExp(filterCategoryDto.description,'i')});
    }

    if(filterCategoryDto.status){
      query.push({status: filterCategoryDto.status});
    }


    let category 
    if(query.length>0){
      let status
      query.map( q =>{
        if(q.status != undefined) {
          status = q.status
        }
      } )

      if(status != undefined){
        category = this.categoryModel.find({
          $and: [{
            $and: [query[0]]
          }, {
            $and: [{status: status}]
          }]
        })

      }else {
        category = this.categoryModel.find({
          $or:query
        })
      }
    }else {
      category = this.categoryModel.find()
    }

    return category
  }

}
