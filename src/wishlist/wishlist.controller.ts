import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Response,Request } from 'express';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  create(@Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistService.create(createWishlistDto);
  }

  // @ApiBearerAuth('JWT-auth')
  // @UseGuards(JwtGuard,RolesGuard)
  @Post('/addProductToWishlist')
  async addProductToWishlist(
    @Req() req: Request, 
    @Res() res: Response, 
    @Body() createWishlistDto: CreateWishlistDto
    ) {
    try {
      // console.log(req)
      // console.log(1);
      console.log(createWishlistDto)
      await this.wishlistService.addProductToWishlist({...createWishlistDto});
      res.status(HttpStatus.OK).json({message:'El producto se agrego a tu wishlist'});
    } catch (error) {
      console.log(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'Ocurrió un error al crear el producto'});
    }
  }

  @Get()
  findAll() {
    return this.wishlistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishlistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWishlistDto: UpdateWishlistDto) {
    return this.wishlistService.update(+id, updateWishlistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishlistService.remove(+id);
  }
}
