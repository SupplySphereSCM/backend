import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { OrdersService } from '../orders/orders.service';
import { OrdersModule } from '../orders/orders.module';

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService],
  imports: [OrdersModule,TypeOrmModule.forFeature([Invoice])],
  exports:[InvoiceService]
})
export class InvoiceModule {}
