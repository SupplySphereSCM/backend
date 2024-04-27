import { Module } from '@nestjs/common';
import { SupplyChainService } from './supply-chain.service';
import { SupplyChainController } from './supply-chain.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplyChain } from './entities/supply-chain.entity';

@Module({
  controllers: [SupplyChainController],
  providers: [SupplyChainService],
  imports: [TypeOrmModule.forFeature([SupplyChain])],
})
export class SupplyChainModule {}
