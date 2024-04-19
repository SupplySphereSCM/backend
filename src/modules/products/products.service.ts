import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(User) private UserRepository: Repository<User>,
    private userService: UsersService,
  
  ) {}
  async create(createProductDto: CreateProductDto,user:any) {
    const newProduct = this.productRepository.create(createProductDto);
    // newProduct.images = images;
    const cu =await this.userService.findOne(user.id)
   newProduct.user=cu
    this.productRepository.save(newProduct);
    
    return newProduct;
  }

  findAll() {
    const products = this.productRepository.find();
    return products;
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { product_id: id },
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
