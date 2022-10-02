import { Controller, Get, Post, Body, Put, HttpStatus, Res, Query, ParseBoolPipe, Param, UseGuards, Req, SetMetadata, UseInterceptors, UploadedFiles, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response,Request } from 'express';
import { ParseIdPipe } from '../utilities/parse-id.pipe';
import { FilterProductDto } from './dto/filter-product.dto';
import { JwtGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ParseFormDataJsonPipe } from '../pipes/parse-form-data-json.pipe';
import { PhotoI } from 'src/interfaces/photo.interface';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard,RolesGuard)
  @SetMetadata('roles',['admin'])
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files',5))
  @Post('/createProduct')
  async create(
    @Req() req: Request, 
    @Res({ passthrough: true }) res: Response, 
    @Body(new ParseFormDataJsonPipe({except:['files']}),new ValidationPipe()) createProductDto: CreateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>) {
    try {

      const images = await this.productService.updateImages(files);
      
      const photosToProduct = images.map((img)=>{
        return {public_id:img.public_id,url:img.url,asset_id:img.asset_id}
      });
      
      await this.productService.create({...createProductDto,photos:photosToProduct});
      res.status(HttpStatus.OK).json({message:'El producto ha sido creado'})
    } catch (error) {
      console.log(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'Ocurrió un error al crear el producto'})
    }
  }

  @Get('/getProducts')
  findAll() {
    return this.productService.findAll();
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard)
  @Get('/getProduct/:id')
  async findOne(@Res({ passthrough: true })res: Response, @Param('id') id: string) {
    // console.log(id)
    const product = await this.productService.findOne(id)
    // console.log(product)
    return {product:product};
  }

  @Get('/filterProducts')
  filterProducts(@Query() filterProductDto: FilterProductDto) {
    return this.productService.filterProduct(filterProductDto);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard,RolesGuard)
  @SetMetadata('roles',['admin'])
  @Put('/updatePro')
  async update(@Res({ passthrough: true }) res: Response,@Query('id',ParseIdPipe) id: string, @Body() updateProductDto: UpdateProductDto) {
    try {
      console.log(id)
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
      console.log(id)
      await this.productService.changeStatus(id,status);
      res.status(HttpStatus.OK).json({message:`Se ha ${status?'activado':'desactivado'} el producto`})
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:`Ocurrió un error al ${status?'activar':'desactivar'} el producto`})
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard,RolesGuard)
  @SetMetadata('roles',['admin'])
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files',1))
  @Put('/addPhoto')
  async changePhoto(@Res({ passthrough: true }) res: Response,@Query('id',ParseIdPipe) id: string, @UploadedFiles() files: Array<Express.Multer.File>) {
    try {
      console .log(files)
      const images = await this.productService.updateImages(files);

      const photoToProduct = images.map((img)=>{
        return {public_id:img.public_id,url:img.url,asset_id:img.asset_id}
      });

      // eslint-disable-next-line prefer-const
      let product = await this.productService.addPhoto(id,photoToProduct[0]);

      res.status(HttpStatus.OK).json({message:`Se ha agregado la imagen al produdcto`, product: product})
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:`Ocurrió un error al agregar l aimagen al prodcuto`})
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard,RolesGuard)
  @SetMetadata('roles',['admin'])
  @Put('/deletePhoto')
  async deletePhoto(@Res({ passthrough: true }) res: Response,@Query('id',ParseIdPipe) id: string, @Body() photo: PhotoI) {
    try {
      console .log(photo)

      // eslint-disable-next-line prefer-const
      let product = await this.productService.deletePhoto(id,photo);

      res.status(HttpStatus.OK).json({message:`Se ha eliminado la imagen al producto`, product: product})
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:`Ocurrió un error al eliminado l imagen al producto`})
    }
  }
}
