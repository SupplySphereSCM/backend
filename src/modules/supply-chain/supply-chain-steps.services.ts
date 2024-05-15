import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplyChainSteps } from './entities/supply-chain-steps.entity';
import { Repository } from 'typeorm';
import { CreateSupplyChainStepsDto } from './dto/create-supply-chain-steps.dto';
import { RawMaterialsService } from '../raw-materials/raw-materials.service';
import { ProductsService } from '../products/products.service';
import { ServicesService } from '../services/services.service';
import { OrdersService } from '../orders/orders.service';

import { TransporterServicesService } from '../services/transporter.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class SupplyChainStepsService {
  constructor(
    @InjectRepository(SupplyChainSteps)
    private supplychainStepRepo: Repository<SupplyChainSteps>,
    private rawmaterialservice: RawMaterialsService,
    private productService: ProductsService,
    private serviceService: ServicesService,
    private transportService: TransporterServicesService,
    private orderService: OrdersService,
    private userService: UsersService,
  ) {}

  async create(createSupplyChainstepsDto: CreateSupplyChainStepsDto) {
    const supplyChain = await this.supplychainStepRepo.create();
    supplyChain.from = await this.userService.findOne(
      createSupplyChainstepsDto.from,
    );
    supplyChain.to = await this.userService.findOne(
      createSupplyChainstepsDto.to,
    );

    if (createSupplyChainstepsDto.rawMaterial != null) {
      supplyChain.rawMaterial = await this.rawmaterialservice.findOne(
        createSupplyChainstepsDto.rawMaterial,
      );
    }
    if (createSupplyChainstepsDto.product != null) {
      supplyChain.product = await this.productService.findOne(
        createSupplyChainstepsDto.product,
      );
    }
    if (createSupplyChainstepsDto.service != null) {
      supplyChain.service = await this.serviceService.findOne(
        createSupplyChainstepsDto.service,
      );
    }
    if (createSupplyChainstepsDto.transport != null) {
      supplyChain.transport = await this.transportService.findOne(
        createSupplyChainstepsDto.transport,
      );
    }
    // else{
    //     throw new Error('something went wrong')
    // }
    supplyChain.quantity = createSupplyChainstepsDto.quantity;
    supplyChain.stepType = createSupplyChainstepsDto.stepType;

    return await this.supplychainStepRepo.save(supplyChain);
  }

  findAll() {
    return this.supplychainStepRepo.find({
      relations: [
        'product',
        'service',
        'transport',
        'rawMaterial',
        'from',
        'to',
      ],
    });
  }

  findOne(id: string) {
    return this.supplychainStepRepo.findBy({
      id,
    });
  }

  update(id: string) {
    return `This action updates a #${id} supplyChain`;
  }

  async remove(id: string) {
    const supplyChain = await this.supplychainStepRepo.findOne({
      where: { id },
    });
    if (!supplyChain) {
      throw new Error(`SupplyChain with id ${id} not found`);
    }
    return this.supplychainStepRepo.remove(supplyChain);
  }
}
