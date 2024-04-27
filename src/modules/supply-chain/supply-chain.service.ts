import { Injectable } from '@nestjs/common';
import { CreateSupplyChainDto } from './dto/create-supply-chain.dto';
import { UpdateSupplyChainDto } from './dto/update-supply-chain.dto';

@Injectable()
export class SupplyChainService {
  create(createSupplyChainDto: CreateSupplyChainDto) {
    return 'This action adds a new supplyChain';
  }

  findAll() {
    return `This action returns all supplyChain`;
  }

  findOne(id: string) {
    return `This action returns a #${id} supplyChain`;
  }

  update(id: string, updateSupplyChainDto: UpdateSupplyChainDto) {
    return `This action updates a #${id} supplyChain`;
  }

  remove(id: string) {
    return `This action removes a #${id} supplyChain`;
  }
}
