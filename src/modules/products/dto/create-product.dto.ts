import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsString,
  isString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  subDescription: string;

  @IsArray()
  @ArrayNotEmpty()
  images: string[];

  @IsString()
  code: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsNumber()
  tax: number;

  @IsString()
  transactionHash: string;

  @IsString()
  eid: string;
}
