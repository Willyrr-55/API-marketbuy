import { CanActivate, ExecutionContext, Injectable, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector){}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const validRoles = this.reflector.get<string[]>('roles',context.getHandler());

    const roleUser = req.user.role;

    if(validRoles.includes(roleUser)){
      return true;
    }else{
      throw new BadRequestException({message:'Operación no permitida para este rol'})
    }
    
  }
}
