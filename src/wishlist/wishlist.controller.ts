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

  @Post()
  create(@Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistService.create(createWishlistDto);
  }

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
      console.log(user)
      const { productId } = createWishlistDto;
      console.log(productId )

      const wish = await this.wishlistService.findOne(user.wishlistId);
      
      if(wish){
            if((wish.productIds as any)?.includes(productId)){
                return res.status(404).json({
                    message:'Este producto ya esta en tu lista de Favoritos'
                })
            }
            (wish.productIds as any).push(productId)
            await this.wishlistService.addProductToWishlist({...createWishlistDto});
            return res.status(200).json({
                ok:true,
                message:'El producto se agrego a tu wishlist'
                })
        }
      // console.log(1);
      // console.log(createWishlistDto)
     
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
