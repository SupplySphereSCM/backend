import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { QueryObjectDto } from 'src/common/dto/query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { ApiFeatures } from 'src/utils/api-features';
import { Order } from '../orders/entities/order.entity';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class InvoiceService {
  
  constructor(
    @InjectRepository(Invoice) private invoiceRepository: Repository<Invoice>,
    private orderService:OrdersService,
    
  ) {}
  async create(createInvoiceDto: CreateInvoiceDto) {
    // const order = await this.orderService.findOne(createInvoiceDto.orderId)
    // const invoice = new Invoice();
    // invoice.from = order.from
    // invoice.to= order.to
    // if(order.rawMaterial){
    //       invoice.name = order.rawMaterial.name
    //     }
    //     if(order.product){
    //       invoice.name = order.product.name
    //     }
    //     if(order.transport){
    //       invoice.name = order.transport.name
    //     }
    //     if(order.service){
    //       invoice.name = order.service.name
    //     }
    //     invoice.total = order.total
    //     invoice.order=order
    //     return this.invoiceRepository.save(invoice)
  }

  findAll(query?: QueryObjectDto) {
    let invoices = new ApiFeatures(this.invoiceRepository, query).findAll();
    return invoices;
    
  }

  findOne(id: string) {
    return this.invoiceRepository.findOne({where:{id}});
  }

  update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  async remove(id: string) {
    const invoice = await this.invoiceRepository.findOne({where:{id}});
    return this.invoiceRepository.remove(invoice)
  }
}
