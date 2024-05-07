import { ArrayNotEmpty, IsArray, IsNumber, IsString } from 'class-validator';

export class CreateRawMaterialDto {
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
}
