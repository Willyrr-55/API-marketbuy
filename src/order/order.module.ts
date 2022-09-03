import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schemas';
import { ProductModule } from '../product/product.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Order.name,schema:OrderSchema}]),
    ProductModule,
    AuthModule
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
