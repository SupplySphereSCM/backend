import { Module, forwardRef } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { InvoiceModule } from '../invoice/invoice.module';
import { RawMaterialsModule } from '../raw-materials/raw-materials.module';
import { ServicesModule } from '../services/services.module';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [forwardRef(() => InvoiceModule),ProductsModule,
    RawMaterialsModule,
    ServicesModule,
    UsersModule, TypeOrmModule.forFeature([Order])],
  exports: [OrdersService],
})
export class OrdersModule {}
