import { IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  transaction_id: string;
}
