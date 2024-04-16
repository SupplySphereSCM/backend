import { IsNegative, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  product_id: string;

  @IsString()
  name: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsNumber()
  tax: number;

  // @IsString()
  // images:string[];

  @IsString()
  description:string;

  @IsString()
  subDescription:string;
}
