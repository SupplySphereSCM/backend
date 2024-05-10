import { Module } from '@nestjs/common';
import { RawMaterialsService } from './raw-materials.service';
import { RawMaterialsController } from './raw-materials.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RawMaterial } from './entities/raw-material.entity';

@Module({
  controllers: [RawMaterialsController],
  providers: [RawMaterialsService],
  imports: [TypeOrmModule.forFeature([RawMaterial])],
  exports:[RawMaterialsService]
})
export class RawMaterialsModule {}
