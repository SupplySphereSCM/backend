import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryObjectDto } from 'src/common/dto/query.dto';
import { ApiFeatures } from 'src/utils/api-features';
import { User } from '../users/entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const { ordersList } = createOrderDto;
    const orders = await Promise.all(
      ordersList.map(async (orders) => {
        const order = await this.orderRepository.create();        
        order.services= orders.services;
        order.goods = orders.goods;
        order.from = orders.from;
        order.to = orders.to;
        order.orderStatus = orders.orderStatus;
        order.total = createOrderDto.total;
        await this.orderRepository.save(order);
        return order;
      }),
    );
    

    return orders;
  }

  findAll(query?: QueryObjectDto) {
    let orders = new ApiFeatures(this.orderRepository, query).findAll();
    return orders;
  }

  findOne(id: string) {
    return this.orderRepository.findOne({ where: { id } });
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async remove(id: string, product: any) {
    const order = await this.orderRepository.find({
      where: { id },
    });
    return this.orderRepository.remove(order);
  }
}
