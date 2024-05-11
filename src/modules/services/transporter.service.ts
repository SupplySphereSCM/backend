import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { QueryObjectDto } from 'src/common/dto/query.dto';
import { ApiFeatures } from 'src/utils/api-features';
import { TransporterService } from './entities/transporterService.entity';
import { CreateTransporterServiceDto } from './dto/create-transporterservice.dto';

@Injectable()
export class TransporterServicesService {
  constructor(
    @InjectRepository(TransporterService)
    private transporterServiceRepository: Repository<TransporterService>,
  ) {}

  async create(
    createTransporterServiceDto: CreateTransporterServiceDto,
    user: User,
  ) {
    const newService = this.transporterServiceRepository.create(
      createTransporterServiceDto,
    );
    newService.user = user;
    await this.transporterServiceRepository.save(newService);
    return newService;
  }

  async findAll(query: QueryObjectDto) {
    const filteredServices =await this.transporterServiceRepository.find({relations:['user']})
     
    return {data:filteredServices};
  }

  async findOne(id: string) {
    const service = await this.transporterServiceRepository.findOne({
      where: { id },
    });
    return service;
  }

  async findUserServices(user: User) {
    const services = await this.transporterServiceRepository.findBy({
      user:{
        id:user.id,
      },
    });
    return services;
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    const service = await this.findOne(id);
    Object.assign(service, updateServiceDto);
    return this.transporterServiceRepository.save(service);
  }

  async remove(id: string) {
    const service = await this.findOne(id);
    return this.transporterServiceRepository.remove(service);
  }
}
