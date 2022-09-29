import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary/cloudinary.service';
import { PhotoI } from 'src/interfaces/photo.interface';
import { CreateBrandDto } from './dto/create-brand.dto';
import { FilterBrandDto } from './dto/filter-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand, BrandDocument } from './schemas/brand.schema';

@Injectable()
export class BrandService {

  constructor(@InjectModel(Brand.name) private readonly brandModel:Model<BrandDocument>, private cloudinaryService: CloudinaryService){}

  async create(createBrandDto: CreateBrandDto):Promise<Brand> {
    return this.brandModel.create(createBrandDto);
  }

  async findAll(): Promise <Brand[]> {
    return this.brandModel.find({status: true});
  }

  async findOne(id: string): Promise <Brand> {
    return this.brandModel.findOne({_id:id});
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    return this.brandModel.findOneAndUpdate({_id:id},updateBrandDto,{
      new:true
    });
  }

  async updateBrandPhoto(id: string, photo: PhotoI) {
    return this.brandModel.findOneAndUpdate({_id:id},{photo:photo},{
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

  async filterBrand(filterBrandDto:FilterBrandDto): Promise<Brand[]>{
    const query = [];

    if(filterBrandDto._id){
      query.push({_id:filterBrandDto._id});
    }


    if(filterBrandDto.name){
      query.push({name:new RegExp(filterBrandDto.name,'i')});
    }

    if(filterBrandDto.description){
      query.push({description:new RegExp(filterBrandDto.description,'i')});
    }

    if(filterBrandDto.status){
      query.push({status: filterBrandDto.status});
    }


    let brand 
    if(query.length>0){
      let status
      query.map( q =>{
        if(q.status != undefined) {
          status = q.status
        }
      } )

      if(status != undefined){
        brand = this.brandModel.find({
          $and: [{
            $and: [query[0]]
          }, {
            $and: [{status: status}]
          }]
        })

      }else {
        brand = this.brandModel.find({
          $or:query
        })
      }
    }else {
      brand = this.brandModel.find()
    }

    return brand
  }

}
