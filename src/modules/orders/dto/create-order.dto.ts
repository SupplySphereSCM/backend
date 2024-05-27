import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Product } from 'src/modules/products/entities/product.entity';
import { Service } from 'src/modules/services/entities/service.entity';
import { SupplyChainSteps } from 'src/modules/supply-chain/entities/supply-chain-steps.entity';

export class CreateOrderDto {
  @IsArray()
  @IsOptional()
  order?: SupplyChainSteps;

  @IsString()
  @IsOptional()
  supplyChainEid?: string;

  @IsString()
  @IsOptional()
  from?: string;

  @IsString()
  @IsOptional()
  to?: string;

  @IsString()
  @IsOptional()
  via?: string;

  @IsString()
  @IsOptional()
  product?: string;

  @IsString()
  @IsOptional()
  transport?: string;

  @IsNumber()
  @IsOptional()
  tax?: number;

  @IsNumber()
  @IsOptional()
  total?: number;

  @IsNumber()
  @IsOptional()
  deliveryCharges?: number;

  @IsNumber()
  @IsOptional()
  quantity?: number;
}
