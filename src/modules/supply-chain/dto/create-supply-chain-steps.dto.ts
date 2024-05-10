import { IsString } from "class-validator";
import { Product } from "src/modules/products/entities/product.entity";
import { RawMaterial } from "src/modules/raw-materials/entities/raw-material.entity";
import { Service } from "src/modules/services/entities/service.entity";
import { TransporterService } from "src/modules/services/entities/transporterService.entity";
import { User } from "src/modules/users/entities/user.entity";

export class CreateSupplyChainStepsDto {
    from : string;
    to : string;
    product: string|null;
    service:string|null;
    rawMaterial:string|null;
    transport:string|null;
}