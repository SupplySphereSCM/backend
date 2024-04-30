import { registerAs } from '@nestjs/config';
import { IsOptional, IsString } from 'class-validator';

import { FileConfig } from './config.type';
import validateConfig from 'src/utils/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  AWS_S3_REGION: string;

  @IsString()
  @IsOptional()
  AWS_ACCESS_KEY_ID: string;

  @IsString()
  @IsOptional()
  AWS_SECRET_ACCESS_KEY: string;

  @IsString()
  @IsOptional()
  FILE_ACCESS_TOKEN: string;
}

export default registerAs<FileConfig>('file', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    awsS3Region: process.env.AWS_S3_REGION,
    apiKey: process.env.AWS_ACCESS_KEY_ID,
    apiSecret: process.env.AWS_SECRET_ACCESS_KEY,
    accessToken: process.env.FILE_ACCESS_TOKEN,
  };
});
