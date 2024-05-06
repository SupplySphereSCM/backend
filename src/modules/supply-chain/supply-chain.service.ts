import { Injectable } from '@nestjs/common';
import { CreateSupplyChainDto } from './dto/create-supply-chain.dto';
import { UpdateSupplyChainDto } from './dto/update-supply-chain.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplyChain } from './entities/supply-chain.entity';
import { Repository } from 'typeorm';
import { SupplyChainSteps } from './entities/supply-chain-steps.entity';

@Injectable()
export class SupplyChainService {
  constructor(
    @InjectRepository(SupplyChain)
    private supplychainRepo: Repository<SupplyChain>,
    @InjectRepository(SupplyChainSteps)
    private supplychainStepRepo: Repository<SupplyChainSteps>,
  ) {}

  create(createSupplyChainDto: CreateSupplyChainDto) {
    return 'This action adds a new supplyChain';
  }

  findAll() {
    return this.supplychainRepo.find({
      relations: {
        steps: true,
      },
    });
  }

  findOne(id: string) {
    return this.supplychainRepo.findBy({
      id,
      steps: true,
    });
  }

  update(id: string, updateSupplyChainDto: UpdateSupplyChainDto) {
    return `This action updates a #${id} supplyChain`;
  }

  async remove(id: string) {
    const supplyChain = await this.supplychainRepo.findOne({
      where: { id },
      relations: ['steps'],
    });
    if (!supplyChain) {
      throw new Error(`SupplyChain with id ${id} not found`);
    }
    return this.supplychainRepo.remove(supplyChain);
  }
}
