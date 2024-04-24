import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import * as path from 'path';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
  imports: [
    // MulterModule.register({
    //   dest: path.resolve(__dirname, '../../../uploads'),
    // }),
  ],
})
export class UploadModule {}
