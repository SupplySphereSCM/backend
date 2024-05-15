import { Module } from '@nestjs/common';
import { SupplyChainService } from './supply-chain.service';
import { SupplyChainController } from './supply-chain.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplyChain } from './entities/supply-chain.entity';
import { SupplyChainSteps } from './entities/supply-chain-steps.entity';
import { OrdersModule } from '../orders/orders.module';
import { SupplyChainStepsController } from './supply-chain-steps.controller';
import { SupplyChainStepsService } from './supply-chain-steps.services';
import { ProductsModule } from '../products/products.module';
import { RawMaterialsModule } from '../raw-materials/raw-materials.module';
import { ServicesModule } from '../services/services.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [SupplyChainController, SupplyChainStepsController],
  providers: [SupplyChainService, SupplyChainStepsService],
  imports: [
    ProductsModule,
    RawMaterialsModule,
    OrdersModule,
    ServicesModule,
    UsersModule,
    TypeOrmModule.forFeature([SupplyChain, SupplyChainSteps]),
  ],
})
export class SupplyChainModule {}
