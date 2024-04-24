import { registerAs } from '@nestjs/config';
import { IsOptional, IsString } from 'class-validator';

import { FileConfig } from './config.type';
import validateConfig from 'src/utils/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  FILE_API_KEY: string;

  @IsString()
  @IsOptional()
  FILE_API_SECRET: string;

  @IsString()
  @IsOptional()
  FILE_ACCESS_TOKEN: string;
}

export default registerAs<FileConfig>('file', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    apiKey: process.env.FILE_API_KEY,
    apiSecret: process.env.FILE_API_SECRET,
    accessToken: process.env.FILE_ACCESS_TOKEN,
  };
});
