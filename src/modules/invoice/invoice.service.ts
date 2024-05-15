import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { QueryObjectDto } from 'src/common/dto/query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { ApiFeatures } from 'src/utils/api-features';
import { Order } from '../orders/entities/order.entity';
import { OrdersService } from '../orders/orders.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice) private invoiceRepository: Repository<Invoice>,
    @Inject(forwardRef(() => OrdersService))
    private orderService: OrdersService,
  ) {}
  async create(createInvoiceDto: CreateInvoiceDto) {
    const order = await this.orderService.findOne(createInvoiceDto.orderId);
    const invoice = await this.invoiceRepository.create();
    invoice.from = order.from;
    invoice.to = order.to;
    if (order.rawMaterial != null) {
      invoice.particular = order.rawMaterial.name;
      invoice.price = order.rawMaterial.price;
    } else if (order.product != null) {
      invoice.particular = order.product.name;
      invoice.price = order.product.price;
    } else {
      invoice.particular = order.service.name;
      invoice.price = order.service.price;
    }

    invoice.logistics = order.transport.name;
    invoice.deliveryCharges = order.transport.priceWithinState;
    invoice.tax = order.tax;
    invoice.quantity = order.quantity;
    invoice.total = order.total;
    invoice.order = order;
    return this.invoiceRepository.save(invoice);
  }

  async findAll(query?: QueryObjectDto) {
    let invoices = await this.invoiceRepository.find({
      relations: ['from', 'to', 'order'],
    });
    return invoices;
  }

  findOne(id: string) {
    return this.invoiceRepository.findOne({
      where: { id },
      relations: ['from', 'to', 'order'],
    });
  }

  async findUserInvoice(user: User) {
    if (user.roles[0] !== 'TRANSPORTER') {
      var invoices = await this.invoiceRepository.find({
        where: { from: { id: user.id } },
        relations: ['from', 'to', 'order'],
      });
    } else {
      var invoices = await this.invoiceRepository.find({
        where: { logistics: user.firstName },
        relations: ['from', 'to', 'order'],
      });
    }
    return invoices;
  }

  update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  async remove(id: string) {
    const invoice = await this.invoiceRepository.findOne({ where: { id } });
    return this.invoiceRepository.remove(invoice);
  }
}
