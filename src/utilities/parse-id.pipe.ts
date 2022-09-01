import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class ParseIdPipe implements PipeTransform {
  transform(value: any):mongoose.Types.ObjectId {
    const validId:boolean = mongoose.isObjectIdOrHexString(value);

    if(!validId){
      throw new BadRequestException({message:'ID de mongo inválido'})
    }

    return value;
  }
}
