import {
  IsArray,
  IsNegative,
  IsNumber,
  IsString,
  Validate,
  validate,
} from 'class-validator';
import { IsBinaryArrayConstraint } from 'src/common/validators/isBinary.validator';

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

  // @IsArray()
  // @Validate(IsBinaryArrayConstraint) // Ensure each element of the array is binary data
  // images: Buffer[];

  @IsString()
  description: string;

  @IsString()
  subDescription: string;
}
