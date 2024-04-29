import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { QueryObjectDto } from 'src/common/dto/query.dto';
import { ApiFeatures } from 'src/utils/api-features';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service) private serviceRepository: Repository<Service>,
  ) {}
  async create(createServiceDto: CreateServiceDto,user:User) {
    const newService = this.serviceRepository.create(createServiceDto)
    newService.user=user;
    await this.serviceRepository.save(newService)
    return newService    
  }

   async findAll(query: QueryObjectDto) {
    const filteredServices = new ApiFeatures(this.serviceRepository,query).findAll
    return filteredServices;
  }

  async findOne(id: string) {
    const service = await this.findOne(id)
    return service
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    const service = await this.findOne(id)
    Object.assign(service,updateServiceDto)
    return this.serviceRepository.save(service)
    
  }

  async remove(id: string) {
    const service = await this.findOne(id)
    return this.serviceRepository.remove(service)
  }
}
