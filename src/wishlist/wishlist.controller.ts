import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Response,Request } from 'express';
import { UsersService } from 'src/users/users.service';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService, private usersService: UsersService) {}

  // @Post()
  // create(@Body() createWishlistDto: CreateWishlistDto) {
  //   return this.wishlistService.create(createWishlistDto);
  // }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard)
  @Post('/addProductToWishlist')
  async addProductToWishlist(
    @Req() req: Request, 
    @Res() res: Response, 
    @Body() createWishlistDto: CreateWishlistDto
    ) {
    try {
      // console.log(req['user'])
      const userId = req['user']['_id']
      // console.log(userId)

      const user = await this.usersService.findOne(userId);
      
      const { productId } = createWishlistDto;
      

      const wish = await this.wishlistService.findOne(user.wishlistId);
      
      if(wish){
            if((wish.productIds as any)?.includes(productId)){
                return res.status(404).json({
                    message:'Este producto ya esta en tu lista de Favoritos'
                })
            }
            
            // await this.wishlistService.addProductToWishlist({productIds:productId, userId});
            (wish.productIds as any).push(productId)
            await wish.save()
            return res.status(200).json({
                ok:true,
                message:'El producto se agrego a tu wishlist'
                })
        }

      await this.wishlistService.createWishlist({productIds:productId, userId})
      res.status(HttpStatus.OK).json({message:'El producto se agrego a tu wishlist'})
    } catch (error) {
      console.log(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'Ocurrió un error al agregar el producto a tu Wishlist'});
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard)
  @Get('getWishlist')
  async findWishlist(
    @Req() req: Request, 
    @Res() res: Response, @Param('id') id: string) {

    const userId = req['user']['_id'];
    const user = await this.usersService.findOne(userId);

    const wish = await this.wishlistService.findWishlistWithProducts(user.wishlistId);

    if(!wish){
      return res.status(HttpStatus.NOT_FOUND).json({message:`No tienes productos agregados a tu wishlist`})
    }
    
    res.status(HttpStatus.OK).json({data:wish})
  }

  @Get()
  findAll() {
    return this.wishlistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishlistService.findOne(id);
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
