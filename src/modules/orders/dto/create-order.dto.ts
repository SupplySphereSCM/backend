import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { Product } from 'src/modules/products/entities/product.entity';
import { Service } from 'src/modules/services/entities/service.entity';
import { SupplyChainSteps } from 'src/modules/supply-chain/entities/supply-chain-steps.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsArray()
  order: SupplyChainSteps;
}
