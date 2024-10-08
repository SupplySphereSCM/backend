import { IsString } from 'class-validator';
import { STEPTYPE } from 'src/modules/orders/entities/order.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { RawMaterial } from 'src/modules/raw-materials/entities/raw-material.entity';
import { Service } from 'src/modules/services/entities/service.entity';
import { TransporterService } from 'src/modules/services/entities/transporterService.entity';
import { User } from 'src/modules/users/entities/user.entity';

export class CreateSupplyChainStepsDto {
  from: string;
  eid: string;
  to: string;
  product: string | null;
  service: string | null;
  rawMaterial: string | null;
  transport: string | null;
  stepType: STEPTYPE;
  quantity: number;
}
