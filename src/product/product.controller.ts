import { Controller, Get, Post, Body,Put, HttpStatus, Res, Query, ParseBoolPipe, Param, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response,Request } from 'express';
import { ParseIdPipe } from '../utilities/parse-id.pipe';
import { FilterProductDto } from './dto/filter-product.dto';
import { JwtGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard,RolesGuard)
  @SetMetadata('roles',['admin'])
  @Post('/createProduct')
  async create(@Req() req: Request, @Res({ passthrough: true }) res: Response, @Body() createProductDto: CreateProductDto) {
    try {
      await this.productService.create(createProductDto);
      res.status(HttpStatus.OK).json({message:'El producto ha sido creado'})
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'Ocurrió un error al crear el producto'})
    }
  }

  @ApiBearerAuth('JWT-auth')
  @Get('/getProducts')
  findAll() {
    return this.productService.findAll();
  }

  @Get('/getProduct/:id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Get('/filterProducts')
  filterProducts(@Query() filterProductDto: FilterProductDto) {
    return this.productService.filterProduct(filterProductDto);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard,RolesGuard)
  @SetMetadata('roles',['admin'])
  @Put('/updateProduct')
  async update(@Res({ passthrough: true }) res: Response,@Query('id',ParseIdPipe) id: string, @Body() updateProductDto: UpdateProductDto) {
    try {
      await this.productService.update(id, updateProductDto);

      res.status(HttpStatus.OK).json({message:`Se ha actualizado el producto`})
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:`Ocurrió un error al actualizar el producto`})
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard,RolesGuard)
  @SetMetadata('roles',['admin'])
  @Put('/changeStatus')
  async changeStatus(@Res({ passthrough: true }) res: Response,@Query('id',ParseIdPipe) id: string,@Query('status',ParseBoolPipe) status:boolean) {
    try {
      await this.productService.changeStatus(id,status);
      res.status(HttpStatus.OK).json({message:`Se ha ${status?'activado':'desactivado'} el producto`})
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:`Ocurrió un error al ${status?'activar':'desactivar'} el producto`})
    }
  }
}
