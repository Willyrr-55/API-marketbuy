import { Controller, Get, Post, Body,Put, HttpStatus, Res, Query, ParseBoolPipe, UseGuards, SetMetadata } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LoginDto } from './dto/log-in.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { ParseIdPipe } from '../utilities/parse-id.pipe';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard,RolesGuard)
  @SetMetadata('roles',['admin'])
  @Post('/createUser')
  async create(@Res({ passthrough: true }) res: Response,@Body() createUserDto: CreateUserDto) {
    try {
      await this.usersService.create(createUserDto);
      res.status(HttpStatus.OK).json({message:'El usuario ha sido creado'})
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'Ocurrió un error al crear el usuario'})
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard,RolesGuard)
  @SetMetadata('roles',['admin'])
  @Get('/getUsers')
  findAll(@Query() filtersUserDto: FilterUserDto) {
    return this.usersService.findAll(filtersUserDto);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard,RolesGuard)
  @SetMetadata('roles',['admin','user'])
  @Get('/detailUser')
  findOne(@Query() filtersUserDto: FilterUserDto) {
    return this.usersService.findOne(filtersUserDto);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard,RolesGuard)
  @SetMetadata('roles',['admin','user'])
  @Put('/updateUser')
  async update(@Res({ passthrough: true }) res: Response,@Query('id',ParseIdPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      await this.usersService.update(id, updateUserDto);

      res.status(HttpStatus.OK).json({message:`Se ha actualizado el usuario`})
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:`Ocurrió un error al actualizar el usuario`})
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard,RolesGuard)
  @SetMetadata('roles',['admin'])
  @Put('/changeStatus')
  async changeStatus(@Res({ passthrough: true }) res: Response,@Query('id',ParseIdPipe) id: string,@Query('status',ParseBoolPipe) status:boolean) {
    try {
      await this.usersService.changeStatus(id,status);
      res.status(HttpStatus.OK).json({message:`Se ha ${status?'activado':'desactivado'} el usuario`})
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:`Ocurrió un error al ${status?'activar':'desactivar'} el usuario`})
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
