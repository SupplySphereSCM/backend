import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './entities/device.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device) private deviceRepository: Repository<Device>,
  ) {}
  async create(createDeviceDto: CreateDeviceDto) {
    const newDevice = this.deviceRepository.create(createDeviceDto);
    this.deviceRepository.save(newDevice);
    return newDevice;
  }

  async findAll() {
    return this.deviceRepository.find();
  }

  async findOne(id: string) {
    const device = await this.deviceRepository.findOne({
      where: { device_id:id },
    });
    if (!device) {
      throw new NotFoundException(`invalid device id`);
    }
    return device;
  }

  async update(id: string, updateDeviceDto: UpdateDeviceDto) {
    const  device = await this.findOne(id);
    Object.assign(device , updateDeviceDto);
    return this.deviceRepository.save(device );
    
  }

  async remove(id: string) {
    const device = await this.findOne(id);
    return this.deviceRepository.remove(device);
    
  }
}
