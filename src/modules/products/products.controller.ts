import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt.guard';

import { QueryObjectDto } from 'src/common/dto/query.dto';
import { Public } from 'src/common/decorators/public-api.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('products')
@ApiTags('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly userService: UsersService,
  ) {}

  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() user: User,
  ) {
    return this.productsService.create(createProductDto, user);
  }

  @Public()
  @Get()
  findAll(@Query() query: QueryObjectDto) {
    return this.productsService.findAll(query);
  }

  @Get('user')
  findProducts(@CurrentUser() user: any) {
    return this.userService.findUserProducts(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
