import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { QueryObjectDto } from 'src/common/dto/query.dto';
import { ApiFeatures } from 'src/utils/api-features';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private userService: UsersService,
  ) {}
  async create(createProductDto: CreateProductDto, user: any) {
    const newProduct = this.productRepository.create(createProductDto);
    // newProduct.images = images;
    const cu = await this.userService.findOne(user.id);
    newProduct.user = cu;
    this.productRepository.save(newProduct);

    return newProduct;
  }

  findAll(query: QueryObjectDto) {
    const filteredProducts = new ApiFeatures(
      this.productRepository,
      query,
    ).findAll();

    return filteredProducts;
    // const products = this.productRepository.find();
    // return products;
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`product not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    return this.productRepository.remove(product);
  }
}
