import { IsNumber, IsString } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  volume: number;

  @IsNumber()
  tax: number;

  @IsString()
  description: string;

  @IsString()
  transactionHash: string;

  @IsString()
  eid: string;
}
