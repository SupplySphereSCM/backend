import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductList } from '../../invoice/entities/invoice.entity';
import { User } from '../../users/entities/user.entity';
import { STATUS } from '../entities/order.entity';
import { Product } from 'src/modules/products/entities/product.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsArray()
  @Type(() => Product)
  products: Product[];

  @IsNotEmpty()
  @IsNumber()
  total: number;
}
