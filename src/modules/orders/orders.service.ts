import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private productService: ProductsService,
  ) {}
  create(createOrderDto: CreateOrderDto, buyer: any) {
    const randomNumber = Math.floor(Math.random() * 1000000);

    const Orderid = randomNumber.toString();
    const { products } = createOrderDto;
    const orders = products.map((product) => {
      const order = this.orderRepository.create();
      order.id = Orderid;
      order.product = product;
      order.from = buyer;
      order.to = product.user;
      order.total = createOrderDto.total;
      this.orderRepository.save(order);
    });
    // order.to =

    return orders;
  }

  findAll() {
    return this.orderRepository.find();
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
