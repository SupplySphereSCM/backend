import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product]),TypeOrmModule.forFeature([User])],
  controllers: [ProductsController],
  providers: [ProductsService,UsersService],
  exports: [ProductsService],
})
export class ProductsModule {}
