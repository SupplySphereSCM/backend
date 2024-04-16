import { IsArray, IsEnum, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductList } from '../../invoice/entities/invoice.entity';
import { User } from '../../users/entities/user.entity';
import { STATUS } from '../entities/order.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsEnum(STATUS)
  orderStatus: STATUS;

  @IsNotEmpty()
  from: User;

  @IsNotEmpty()
  to: User;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductList)
  products: ProductList[];

  @IsNotEmpty()
  @IsNumber()
  total: number;
}