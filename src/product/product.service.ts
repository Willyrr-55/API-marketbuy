import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { CloudinaryService } from '../cloudinary/cloudinary/cloudinary.service';
import { ProductToOrderI } from '../order/interfaces/product-to-order.interface';

@Injectable()
export class ProductService {

  constructor(@InjectModel(Product.name) private readonly productModel:Model<ProductDocument>,private cloudinaryService: CloudinaryService){}


  async create(createProductDto: CreateProductDto) {
    return this.productModel.create(createProductDto);
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().populate('category').populate('brand');
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findOne({_id: { $in: id }}).populate('category').populate('brand');;
  }

  async filterProduct(filterProductDto:FilterProductDto): Promise<Product[]>{
    const query = [];

    if(filterProductDto._id){
      query.push({_id:filterProductDto._id});
    }

    if(filterProductDto.stock){
      query.push({stock: filterProductDto.stock });
    }

    if(filterProductDto.name){
      query.push({name:new RegExp(filterProductDto.name,'i')});
    }

    // if(filterProductDto.category){
    //   query.push({name:new RegExp(filterProductDto.category,'i')});
    // }

    // if(filterProductDto.brand){
    //   query.push({name:new RegExp(filterProductDto.brand,'i')});
    // }

    return this.productModel.find({
      $or:query
    }).populate('category').populate('brand').exec();
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel.findOneAndUpdate({_id:id},updateProductDto,{
      new:true
    });
  }

  async changeStatus(id: string,status:boolean) {
    return this.productModel.findOneAndUpdate({_id:id},{$set:{status}})
  }


  async updateImages(images:Express.Multer.File[]){
    const urlImages = await Promise.all(
      images.map((file)=>this.cloudinaryService.uploadImage(file))
    );
    
    return urlImages;
  }

  async getProductsByIds(ids:string[]){
    return this.productModel.find({_id:{$in:ids}}).exec();
  }

  async changeStockProducts(products:ProductToOrderI[]){
    return Promise.all(
      products.map((p)=>{
        return this.productModel.updateOne({_id:p.idProduct},{$inc:{stock:-p.quantity}})
      })
    )
  }
}
