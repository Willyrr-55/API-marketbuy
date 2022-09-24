import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import config from 'src/config';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtGuard implements CanActivate {

  constructor(private jwtService: JwtService,private usersService: UsersService){}

  async canActivate(context: ExecutionContext): Promise<any> {
    try {
      const req = context.switchToHttp().getRequest();
      const bearerToken = req['headers']['authorization'] as string;
      
      if(!bearerToken){
        throw new UnauthorizedException({message:'El token es requerido'});
      }

      const token = bearerToken.split('Bearer')[1]?.trim();
      
      const decode = await this.jwtService.verify(token,{secret:config.SECRETJWT});

      const user = await this.usersService.findOne({_id:decode._id});

      
      if(!user){
        throw new BadRequestException({message:'El usuario no existe',invalidToken:true});
      }

      req.user = user;
      return true;
    } catch (error) {
      console.log(error)
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException({message: 'Token expirado'});
      }
  
      throw new BadRequestException({message: 'Token inválido',invalidToken:true});
  
    }
  }
}
