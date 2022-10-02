import { PipeTransform } from '@nestjs/common';
import mongoose from 'mongoose';
export declare class ParseIdPipe implements PipeTransform {
    transform(value: any): mongoose.Types.ObjectId;
}
