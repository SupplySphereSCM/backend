import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryObjectDto } from 'src/common/dto/query.dto';
import { ApiFeatures } from 'src/utils/api-features';
import { User } from '../users/entities/user.entity';
import { InvoiceService } from '../invoice/invoice.service';

@Injectable()
export class OrdersService {
  constructor(
   
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @Inject(forwardRef(()=>InvoiceService))private invoiceService:InvoiceService

  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const { order } = createOrderDto;
    const newOrder = await this.orderRepository.create();
    newOrder.product = order.product;
    newOrder.rawMaterial = order.rawMaterial;
    newOrder.service = order.service;
    newOrder.transport = order.transport;
    newOrder.via = order.transport.user;
    newOrder.from = order.from;
    newOrder.to = order.to;
    newOrder.quantity = order.quantity;
    if (order.service != null) {
      newOrder.tax = order.service.tax;
      newOrder.total =
        order.service?.price * order.quantity +
        order.transport.priceWithinState;
    } else {
      newOrder.tax = order.rawMaterial.tax;
      newOrder.total =
        order.rawMaterial?.price * order.quantity +
        order.transport.priceWithinState;
    }

    newOrder.deliveryCharges = order.transport.priceWithinState;
    // order.orderStatus = orders.orderStatus;
    // newOrder.total= createOrderDto.total;
    newOrder.stepType = order.stepType;
    await this.orderRepository.save(newOrder);
    await this.invoiceService.create({orderId:newOrder.id})
    return newOrder;
  }

  async findAll(query?: QueryObjectDto) {
    let orders = await this.orderRepository.find({
      relations: ['from', 'to', 'via'],
    });
    return orders;
  }

  findOne(id: string) {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['to', 'transport', 'rawMaterial', 'service'],
    });
  }

  async findUserOrders(user: User) {
    if(user.roles[0] !== 'TRANSPORTER'){
      var filteredOrders = await this.orderRepository.find({
      where: { from: { id: user.id } },
      relations: ['from', 'to', 'via', 'rawMaterial', 'service'],
    });
  }else{
    var filteredOrders = await this.orderRepository.find({
      where: { via: { id: user.id } },
      relations: ['from', 'to', 'via', 'rawMaterial', 'service'],
    });

  }
    return filteredOrders;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const updatedOrder = await this.orderRepository.findOne({where:{id}})
    Object.assign(updatedOrder,updateOrderDto)
    return await this.orderRepository.save(updatedOrder)
    
  }

  async remove(id: string, product: any) {
    const order = await this.orderRepository.find({
      where: { id },
    });
    return this.orderRepository.remove(order);
  }
}
