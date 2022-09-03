import { Controller, Get, Post, Body, Param, Res, HttpStatus, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/createOrder')
  async create( @Res({passthrough:true})res :Response, @Body() createOrderDto: CreateOrderDto) {
    try {
      await this.orderService.create(createOrderDto);
      res.status(HttpStatus.OK).json({
        message:'La orden ha sido completada'
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message:'Ocurrió un error al completar la orden'
      });
    }
    
  }

  @Get('/getOrders')
  async findAll(@Res({passthrough:true})res :Response) {
    try {
      const orders = await this.orderService.findAll();
  
      res.status(HttpStatus.OK).json({
        orders
      });
     } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message:'Ocurrió un error al obtener las ordenes'
      })
     }
  }

  @Get('/getDetailOder/:id')
  async findOne(@Res({passthrough:true})res :Response, @Param('id') id: string) {
   try {
    const order = await this.orderService.findOne(id);

    res.status(HttpStatus.OK).json({
      order
    });
   } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message:'Ocurrió un error al obtener la orden'
    })
   }
  }

  @Put('/updateOrder/:id')
  async update(@Res({passthrough:true})res :Response, @Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    try {
      await this.orderService.update(id,updateOrderDto);
      res.status(HttpStatus.OK).json({
        message:'Se ha actualizado la orden'
      })
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message:'Ocurrió un error al actualiar la orden'
      })
    }
  }
}
