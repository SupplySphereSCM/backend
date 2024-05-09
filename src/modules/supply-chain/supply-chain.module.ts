import { Module } from '@nestjs/common';
import { SupplyChainService } from './supply-chain.service';
import { SupplyChainController } from './supply-chain.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplyChain } from './entities/supply-chain.entity';
import { SupplyChainSteps } from './entities/supply-chain-steps.entity';
import { OrdersModule } from '../orders/orders.module';

@Module({
  controllers: [SupplyChainController],
  providers: [SupplyChainService],
  imports: [OrdersModule,TypeOrmModule.forFeature([SupplyChain, SupplyChainSteps])],
})
export class SupplyChainModule {}
