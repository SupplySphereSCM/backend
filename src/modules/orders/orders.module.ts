import { Module, forwardRef } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { InvoiceModule } from '../invoice/invoice.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [forwardRef(() => InvoiceModule), TypeOrmModule.forFeature([Order])],
  exports: [OrdersService],
})
export class OrdersModule {}
