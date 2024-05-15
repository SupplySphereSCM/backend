import { IsNumber, IsString } from 'class-validator';

export class CreateTransporterServiceDto {
  @IsString()
  name: string;

  @IsString()
  transactionHash: string;

  @IsString()
  eid: string;

  @IsNumber()
  priceWithinState: number;

  @IsNumber()
  priceInterState: number;

  @IsNumber()
  priceInternationl: number;

  @IsString()
  description: string;
}
