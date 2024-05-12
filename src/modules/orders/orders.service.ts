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
    const { order } = createOrderDto;
        const newOrder = await this.orderRepository.create();        
        newOrder.product=order.product;
        newOrder.rawMaterial= order.rawMaterial
        newOrder.service= order.service;
        newOrder.transport= order.transport
        newOrder.via=order.transport.user
        newOrder.from = order.from;
        newOrder.to = order.to;
        if(order.service!=null){
          newOrder.total = (order.service?.price*order.quantity)+order.transport.priceWithinState;
        }else{
          newOrder.total = (order.rawMaterial?.price*order.quantity)+order.transport.priceWithinState;

        }
        
        newOrder.deliveryCharges=order.transport.priceWithinState
        // order.orderStatus = orders.orderStatus;
        // newOrder.total= createOrderDto.total;
        await this.orderRepository.save(newOrder);
        return newOrder;
     

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
