import { Injectable } from '@nestjs/common';
import { CreateRawMaterialDto } from './dto/create-raw-material.dto';
import { UpdateRawMaterialDto } from './dto/update-raw-material.dto';
import { User } from '../users/entities/user.entity';
import { QueryObjectDto } from 'src/common/dto/query.dto';
import { RawMaterial } from './entities/raw-material.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiFeatures } from 'src/utils/api-features';

@Injectable()
export class RawMaterialsService {
  constructor(
    @InjectRepository(RawMaterial)
    private rawMaterialRepository: Repository<RawMaterial>,
  ) {}

  async create(createRawMaterialDto: CreateRawMaterialDto, user: User) {
    const newMaterial = this.rawMaterialRepository.create({
      ...createRawMaterialDto,
      available: createRawMaterialDto.quantity,
    });
    newMaterial.user = user;
    await this.rawMaterialRepository.save(newMaterial);
    return newMaterial;
  }

  async findUserMaterials(user: User) {
    return this.rawMaterialRepository.findBy({
      user: {
        id: user.id,
      },
    });
  }

  async findAll(query: QueryObjectDto) {
    const filteredMaterials = await this.rawMaterialRepository.find({
      relations: ['user'],
    });

    return { data: filteredMaterials };
  }

  async findOne(id: string) {
    const material = await this.rawMaterialRepository.findOne({
      where: { id },
    });
    return material;
  }

  async update(id: string, updateRawMaterialDto: UpdateRawMaterialDto) {
    const updatedMaterial = await this.rawMaterialRepository.update(
      {
        id,
      },
      updateRawMaterialDto,
    );

    return updatedMaterial;
  }

  async remove(id: string) {
    const material = await this.rawMaterialRepository.findOne({
      where: { id },
    });
    return this.rawMaterialRepository.remove(material);
  }
}
