import { IsString } from 'class-validator';

export class RequestNonceDto {
  @IsString()
  walletAddress: string;
}
