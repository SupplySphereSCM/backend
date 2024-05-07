import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductList } from '../entities/invoice.entity';

export class CreateInvoiceDto {
  // @IsNotEmpty()
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => ProductList)
  // products: ProductList[];

  // @IsNotEmpty()
  // @IsString()
  // from: string;

  // @IsNotEmpty()
  // @IsString()
  // to: string;

  // @IsNotEmpty()
  // @IsNumber()
  // cgst: number;

  // @IsNotEmpty()
  // @IsNumber()
  // sgst: number;

  // @IsNotEmpty()
  // @IsNumber()
  // total: number;
  @IsString()
  @IsNotEmpty()
  orderId:string;
}
