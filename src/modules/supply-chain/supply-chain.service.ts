import { Injectable } from '@nestjs/common';
import { CreateSupplyChainDto } from './dto/create-supply-chain.dto';
import { UpdateSupplyChainDto } from './dto/update-supply-chain.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplyChain } from './entities/supply-chain.entity';
import { Repository } from 'typeorm';
import { SupplyChainSteps } from './entities/supply-chain-steps.entity';
import { User } from '../users/entities/user.entity';
import { OrdersService } from '../orders/orders.service';
import { RawMaterial } from '../raw-materials/entities/raw-material.entity';
import { RawMaterialsService } from '../raw-materials/raw-materials.service';
import { ProductsService } from '../products/products.service';
import { ServicesService } from '../services/services.service';
import { TransporterServicesService } from '../services/transporter.service';
import { UsersService } from '../users/users.service';
import { SupplyChainStepsService } from './supply-chain-steps.services';

@Injectable()
export class SupplyChainService {
  constructor(
    @InjectRepository(SupplyChain)
    private supplychainRepo: Repository<SupplyChain>,
    @InjectRepository(SupplyChainSteps)
    private supplychainStepRepo: Repository<SupplyChainSteps>,
    private stepsRepo: SupplyChainStepsService,

    private orderService: OrdersService,
  ) {}

  async create(createSupplyChainDto: CreateSupplyChainDto, user: User) {
    // console.log('Createsupplychain dto:', createSupplyChainDto);

    const { eid, steps, description, name, transactionHash } =
      createSupplyChainDto;
    const supplySteps = await Promise.all(
      steps.map(async (step) => {
        return await this.stepsRepo.create({ ...step });
      }),
    );

    const supplyChain = await this.supplychainRepo.create({
      eid,
      name,
      description,
      transactionHash,
      steps: supplySteps,
    });
    await Promise.all(
      supplySteps.map(
        async (step) =>
          await this.orderService.create({
            order: step,
            supplyChainEid: createSupplyChainDto.eid,
          }),
      ),
    );

    return await this.supplychainRepo.save(supplyChain);
  }

  async finduser(user:User){
    return await this.supplychainRepo.findBy({
      user: {
        id: user.id,

      },


    });

  }

  findAll() {
    return this.supplychainRepo.find({
      relations: {
        steps: true,
      },
    });
  }

  findOne(id: string) {
    return this.supplychainRepo.findOne({where:{id},relations:['steps','steps.from','steps.to']
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
    const { steps } = supplyChain;
    // console.log(steps);

    await Promise.all(
      steps.map(async (step) => {
        const istep = await this.supplychainStepRepo.findOne({
          where: { id: step.id },
        });
        await this.supplychainStepRepo.remove(istep);
      }),
    );

    return this.supplychainRepo.remove(supplyChain);
  }
}
