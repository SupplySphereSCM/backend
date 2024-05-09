import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { SupplyChainSteps } from "../entities/supply-chain-steps.entity";

export class CreateSupplyChainDto {
    @IsNotEmpty()
    @IsArray()
    steps:SupplyChainSteps[];

    @IsString()
    name:string;

    @IsString()
    description:string;


}
