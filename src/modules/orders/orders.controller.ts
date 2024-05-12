import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { QueryObjectDto } from 'src/common/dto/query.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';

@Controller('orders')
@ApiTags('Order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @CurrentUser() buyer: User) {
    return this.ordersService.create(createOrderDto);
  }
  @Get('user')
  findUserOrders(@CurrentUser() user:User){
    return this.ordersService.findUserOrders(user)
  }
  @Get()
  findAll(@Query() query: QueryObjectDto) {
    return this.ordersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() product: any) {
    return this.ordersService.remove(id, product);
  }
}
