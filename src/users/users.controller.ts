import { Controller, Get, Post, Body, Param,Put, HttpStatus, Res, Query, ParseBoolPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LoginDto } from './dto/log-in.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Res({ passthrough: true }) res: Response,@Body() createUserDto: CreateUserDto) {
    try {
      await this.usersService.create(createUserDto);
      res.status(HttpStatus.OK).json({message:'El usuario ha sido creado'})
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'Ocurrió un error al crear el usuario'})
    }
  }

  @Get()
  findAll(@Query() filtersUserDto: FilterUserDto) {
    return this.usersService.findAll(filtersUserDto);
  }

  @Get('/detailUser')
  findOne(@Query() filtersUserDto: FilterUserDto) {
    return this.usersService.findOne(filtersUserDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Put('/changeStatus')
  async changeStatus(@Res({ passthrough: true }) res: Response,@Query('id') id: string,@Query('status',ParseBoolPipe) status:boolean) {
    try {
      console.log(id,!status)
      await this.usersService.changeStatus(id,!status);
      res.status(HttpStatus.OK).json({message:`Se ha ${status?'desactivado':'activado'} el usuario`})
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:`Ocurrió un error al ${status?'desactivar':'activar'} el usuario`})
    }
  }

  // TODO: Auth Methods
  @Post('/login')
  async logIn(@Res({ passthrough: true }) res: Response,@Body() loginData: LoginDto){
    try {
      const user = await this.usersService.findOneByEmail(loginData.email);
    
      if(!user){
        res.status(HttpStatus.BAD_REQUEST).json({
          message:'Email o contraseña incorrectos'
        });

        return;
      }

      const matchPassword = await this.usersService.comparePassword(loginData.password,user.password);

      if(!matchPassword){
        res.status(HttpStatus.BAD_REQUEST).json({
          message:'Email o contraseña incorrectos'
        });

        return;
      }

      const token = await this.usersService.generateToken({_id:user['_id'],role:user.role});

      res.status(HttpStatus.OK).json({
        message:'Has iniciado sesión correctamente',
        token
      });
    } catch (error) {
      console.log(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'Ocurrió un error al iniciar sesión'})
    }
  }

  @Post('/signUp')
  async signUp(@Res({ passthrough: true }) res: Response,@Body() createUserDto: SignUpDto) {
    try {
      const user = await this.usersService.signUp(createUserDto);

      const token = await this.usersService.generateToken({_id:user['_id'],role:user.role});
      res.status(HttpStatus.OK).json({message:'Te has registrado correctamente',token})
    } catch (error) {
      console.log(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'Ocurrió un error al crear el usuario'})
    }
  }
}
