import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order,OrderDocument} from './schemas/order.schemas';
import { ProductService } from '../product/product.service';
import { ProductToOrderI } from './interfaces/product-to-order.interface';

@Injectable()
export class OrderService {

  constructor(
    @InjectModel(Order.name) private readonly orderModel:Model<OrderDocument>,
    private productService: ProductService
    ){}

  async create(createOrderDto: CreateOrderDto) {
    const productsFromReq = createOrderDto.products;
    const idsProducts = productsFromReq.map(p=>p.idProduct);
    const products = await this.productService.getProductsByIds(idsProducts);
    
    const productsToOrder = products.map((p)=>{

      const obj= {} as ProductToOrderI;

      const quantity = productsFromReq?.find((v)=>v.idProduct==p._id.toString());
      obj.photo = p.photos[0].url;
      obj.quantity = quantity.quantity;
      obj.total = +(obj.quantity *  p.price).toFixed(2);
      obj.idProduct = p._id;
      return obj;
    });

    let totalOrder = 0;

    productsToOrder.forEach((p)=>{
      totalOrder += p.total;
    });

    createOrderDto.total = +(totalOrder).toFixed(2);

    createOrderDto.products = productsToOrder;

    await this.orderModel.create(createOrderDto);

    return this.productService.changeStockProducts(productsToOrder);
  }

  findAll() {
    return this.orderModel.find().populate({
      path:'products.idProduct',
      model:'Product',
      select:'-_id name description'
    });
  }

  findOne(id: string) {
    return this.orderModel.findOne({_id:id}).populate({
      path:'products.idProduct',
      model:'Product',
      select:'-_id name description'
    });
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
   return this.orderModel.findOneAndUpdate({_id:id},updateOrderDto,{new:true})
  }
}
