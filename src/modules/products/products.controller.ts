import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { Express } from 'express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Public } from 'src/common/decorators/public-api.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UsersService } from '../users/users.service';

@Controller('products')
@ApiTags('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly userService: UsersService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  create(@Body() createProductDto: CreateProductDto, @CurrentUser() user: any) {
    // const imagesUrl = images.map(file => file.path);
    return this.productsService.create(createProductDto, user);
  }

  @Public()
  @Get('shop')
  findAll() {
    return this.productsService.findAll();
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
