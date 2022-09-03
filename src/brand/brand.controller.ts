import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseInterceptors,
  SetMetadata,
  UseGuards,
  ValidationPipe,
  Req,
  UploadedFile,
  ParseBoolPipe,
  Query,
  Put,
  UploadedFiles,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Response,Request } from 'express';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { ParseFormDataJsonPipe } from 'src/pipes/parse-form-data-json.pipe';
import { ParseIdPipe } from 'src/utilities/parse-id.pipe';

@Controller('brand')
@ApiTags('Brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard, RolesGuard)
  @SetMetadata('roles', ['admin'])
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files',2))
  @Post('/createBrand')
  async create(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body(
      new ParseFormDataJsonPipe({ except: ['file'] }),
      new ValidationPipe(),
    )
    createBrandDto: CreateBrandDto,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    try {
      const images = await this.brandService.updateImage(files);

      const photoToBrand = images.map((img)=>{
        return {public_id:img.public_id,url:img.url,asset_id:img.asset_id}
      });

      await this.brandService.create({...createBrandDto, photo:photoToBrand[0]})
      res.status(HttpStatus.OK).json({message:'La marca ha sido registrada'});

    } catch (error) {
      console.log(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocurrió un error al registrar la marca' });
    }
  }

  @Get('/getBrands')
  findAll() {
    return this.brandService.findAll();
  }

  @Get('/getBrand/:id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(id);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.brandService.remove(+id);
  // }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard,RolesGuard)
  @SetMetadata('roles',['admin'])
  @Put('/updateBrand')
  async update(@Res({ passthrough: true }) res: Response,@Query('id',ParseIdPipe) id: string, @Body() updateBrandDto: UpdateBrandDto) {
    try {
      await this.brandService.update(id, updateBrandDto);

      res.status(HttpStatus.OK).json({message:`Se ha actualizado la marca`})
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:`Ocurrió un error al actualizar la marca`})
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard,RolesGuard)
  @SetMetadata('roles',['admin'])
  @Put('/changeStatus')
  async changeStatus(@Res({ passthrough: true }) res: Response,@Query('id',ParseIdPipe) id: string,@Query('status',ParseBoolPipe) status:boolean) {
    try {
      await this.brandService.changeStatus(id,status);
      res.status(HttpStatus.OK).json({message:`Se ha ${status?'activado':'desactivado'} la categoria`})
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:`Ocurrió un error al ${status?'activar':'desactivar'} la categoria`})
    }
  }
}
