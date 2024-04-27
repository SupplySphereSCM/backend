import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
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
