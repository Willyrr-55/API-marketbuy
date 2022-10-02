import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { CloudinaryService } from '../cloudinary/cloudinary/cloudinary.service';
import { ProductToOrderI } from '../order/interfaces/product-to-order.interface';
import mongoose from 'mongoose';
import { PhotoI } from 'src/interfaces/photo.interface';

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
    console.log(filterProductDto)
    // eslint-disable-next-line prefer-const
    let query = [];
    let category 
    let brand

    if(filterProductDto._id){
      query.push({_id:filterProductDto._id});
    }

   if(filterProductDto.stock){
    if(filterProductDto.stock == 1){
      console.log('mayor')
      query.push({stock: {$gt:1} });
    } else if(filterProductDto.stock == 0){
      console.log('menor')
      query.push({stock:  { $lt : 1 }});

    }
   }

    if(filterProductDto.name){
      query.push({name:new RegExp(filterProductDto.name,'i')});
    }

    if(mongoose.isValidObjectId(filterProductDto.category)){
      category = {category:filterProductDto.category}
      query.push({category:filterProductDto.category});
    }

    if(mongoose.isValidObjectId(filterProductDto.brand)){
      brand = {brand:filterProductDto.brand}
      query.push({brand:filterProductDto.brand});
    }

    if(filterProductDto.status){
      query.push({status:filterProductDto.status});
    }


    
    let product 
    if(query.length>=2){
      let status
      let stock
      let positionstatus = 0
      let positionStock = 0
      query.map( q =>{
        if(q.status != undefined) {
          positionstatus = positionstatus + 1
          status = q.status
        }
        if(q.stock != undefined) {
          stock = q.stock
          positionStock = positionStock + 1
        }
      } )

      // query = query.slice(0, 1)

      if(status != undefined && stock != undefined){
        product = this.productModel.find({
          $and: [
            {
             $and: query
            }, 
            {
              $and: [{status: status}]
            },
            {
              $and: [{stock: stock}]
            }
        ]
        }).populate('category').populate('brand').exec()
        return product
      }

      if(status != undefined){
        product = this.productModel.find({
          $and: [{
            $and: query
          }, {
            $and: [{status: status}]
          }]
        }).populate('category').populate('brand').exec()
        return product
      }

      if(stock != undefined){
        product = this.productModel.find({
          $and: [
            {
             query
            }, 
            {
              stock: stock
            }
        ]
        }).populate('category').populate('brand').exec()
        return product
      }
      if(category && brand){
        product = this.productModel.find({
          $and: [
            {
             $and: [category]
            }, 
            {
              $and: [brand]
            },
        ]
        }).populate('category').populate('brand').exec()
        return product
      }
    
      product = this.productModel.find({
          $or:query
        }).populate('category').populate('brand').exec()
      return product
    }else if(query.length == 1){
      product = this.productModel.find({
        $or:query
      }).populate('category').populate('brand').exec()
      return product
    } else {
        product = this.productModel.find().populate('category').populate('brand').exec()
      return product
    }
    
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

  async addPhoto(id: string, photo: PhotoI){
    return this.productModel.findOneAndUpdate({_id:id},{$addToSet:{photos:photo}},{
      new:true
    })
  }

  async deletePhoto(id: string, photo: PhotoI){

    const producto = await this.productModel.findOne({$and:[{_id:id}]})
    const newProducto = producto.photos.filter(p => p.url != photo.url) 

    return this.productModel.findOneAndUpdate({_id:id},{photos: newProducto},{
      new:true
    })
  }
}
