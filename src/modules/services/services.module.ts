import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServicesService } from './services.service';
import { Service } from './entities/service.entity';
import { ServicesController } from './services.controller';

import { TransporterServicesService } from './transporter.service';
import { TransporterController } from './transporter-service.controller';
import { TransporterService } from './entities/transporterService.entity';

@Module({
  controllers: [ServicesController, TransporterController],
  providers: [ServicesService, TransporterServicesService],
  imports: [TypeOrmModule.forFeature([Service, TransporterService])],
  exports:[ServicesService,TransporterServicesService]
})
export class ServicesModule {}
