import { Controller, Get, Post, Body,Param, UseGuards, SetMetadata, UseInterceptors, Req, ValidationPipe, Res, UploadedFiles, HttpStatus,  Put, Query, ParseBoolPipe } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/guards/jwt.guard';
import { Response,Request } from 'express';
import { RolesGuard } from 'src/guards/roles.guard';
import { ParseFormDataJsonPipe } from 'src/pipes/parse-form-data-json.pipe';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ParseIdPipe } from 'src/utilities/parse-id.pipe';
import { FilterCategoryDto } from './dto/filter-category.dto';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard,RolesGuard)
  @SetMetadata('roles',['admin'])
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files',2))
  @Post('/createCategory')
  async create(
    @Req() req: Request, 
    @Res({ passthrough: true }) res: Response, 
    @Body(new ParseFormDataJsonPipe({except:['files']}),new ValidationPipe()) createCategoryDto: CreateCategoryDto,
    @UploadedFiles() files: Array<Express.Multer.File>) {
    try {
      const images = await this.categoryService.updateImage(files);

      const photoToCategory = images.map((img)=>{
        return {public_id:img.public_id,url:img.url,asset_id:img.asset_id}
      });

      await this.categoryService.create({...createCategoryDto, photo:photoToCategory[0]})
      res.status(HttpStatus.OK).json({message:'La categoria ha sido registrada'});
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message:'Ocurrió un error al registrar la categoria'
      })
    }
  }

  @Get('/getCategories')
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('/getCategory/:id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard,RolesGuard)
  @SetMetadata('roles',['admin'])

  @Put('/updateCategory')
  async update(@Res({ passthrough: true }) res: Response,@Query('id',ParseIdPipe) id: string, 
                @Body() updateCategoryDto: UpdateCategoryDto)
  {
    try {

      await this.categoryService.update(id, updateCategoryDto);

      res.status(HttpStatus.OK).json({message:`Se ha actualizado la categoria`})
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:`Ocurrió un error al actualizar la categoria`})
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard,RolesGuard)
  @SetMetadata('roles',['admin'])
  @Put('/changeStatus')
  async changeStatus(@Res({ passthrough: true }) res: Response,@Query('id',ParseIdPipe) id: string,@Query('status',ParseBoolPipe) status:boolean,) {
    try {
      await this.categoryService.changeStatus(id,status);
      res.status(HttpStatus.OK).json({message:`Se ha ${status?'activado':'desactivado'} la categoria`})
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:`Ocurrió un error al ${status?'activar':'desactivar'} la categoria`})
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard,RolesGuard)
  @SetMetadata('roles',['admin'])
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files',2))
  @Put('/changePhoto')
  async changePhoto(@Res({ passthrough: true }) res: Response,@Query('id',ParseIdPipe) id: string, @UploadedFiles() files: Array<Express.Multer.File>) {
    try {
      console .log(files)
      const images = await this.categoryService.updateImage(files);

      const photoToBrand = images.map((img)=>{
        return {public_id:img.public_id,url:img.url,asset_id:img.asset_id}
      });

      await this.categoryService.updatecategoryPhoto(id,photoToBrand[0]);

      res.status(HttpStatus.OK).json({message:`Se ha actualizado la imagen de la categoria`, photo: photoToBrand[0]})
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:`Ocurrió un error al actualizar la imagen de la categoria`})
    }
  }

  @Get('/filterCategories')
  filterCategories(@Query() filterCategoryDto: FilterCategoryDto) {
    return this.categoryService.filterCategory(filterCategoryDto);
  }


  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.categoryService.remove(+id);
  // }
}
