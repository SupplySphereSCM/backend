import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { TransporterController } from './transporter-service.controller';
import { TransporterServicesService } from './transporter.service';
import { TransporterService } from './entities/transporterService.entity';

@Module({
  controllers: [ServicesController,TransporterController],
  providers: [ServicesService,TransporterServicesService],
  imports: [TypeOrmModule.forFeature([Service,TransporterService])],
})
export class ServicesModule {}
