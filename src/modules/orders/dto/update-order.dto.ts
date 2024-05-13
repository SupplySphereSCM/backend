import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { STATUS } from '../entities/order.entity';

export class UpdateOrderDto  {
    @IsOptional()
    @IsNumber()
    total:number;

    @IsOptional()
    @IsNumber()
    quantity:number;

    @IsOptional()
    @IsNumber()
    tax:number;

    @IsOptional()
    @IsNumber()
    deliveryCharges:number;

    @IsOptional()
    @IsEnum(STATUS)
    orderStatus:STATUS;

    @IsOptional()
    @IsEnum(STATUS)
    stepType:STATUS;
}
