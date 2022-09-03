import { OmitType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends OmitType(CreateOrderDto, ['products','card_number','expiration_date','cvv','total'] as const) {

}
