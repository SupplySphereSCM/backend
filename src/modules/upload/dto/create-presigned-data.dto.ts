import { IsString } from 'class-validator';

export class CreatePresignedData {
  @IsString()
  key: string;
}
