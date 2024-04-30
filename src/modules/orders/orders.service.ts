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
  async create(createOrderDto: CreateOrderDto, buyer: User) {
    const randomNumber = Math.floor(Math.random() * 1000000);

    const Orderid = randomNumber.toString();
    const { products } = createOrderDto;
    const orders = await Promise.all(
      products.map(async (product) => {
        const order = await this.orderRepository.create();
        order.id = Orderid;
        order.product = product;
        order.from = buyer;
        order.to = product.user;
        order.total = createOrderDto.total;
        await this.orderRepository.save(order);
        return order;
      }),
    );
    // order.to =

    return orders;
  }

  findAll(query?: QueryObjectDto) {
    let orders = new ApiFeatures(this.orderRepository, query).findAll();
    return orders;
  }

  findOne(id: string) {
    return this.orderRepository.find({ where: { id } });
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async remove(id: string, product: any) {
    const order = await this.orderRepository.find({
      where: { id, product: product },
    });
    return this.orderRepository.remove(order);
  }
}
