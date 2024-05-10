import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { SupplyChainSteps } from "../entities/supply-chain-steps.entity";
import { CreateSupplyChainStepsDto } from "./create-supply-chain-steps.dto";

export class CreateSupplyChainDto {
    @IsNotEmpty()
    @IsArray()
    steps:CreateSupplyChainStepsDto[];

    @IsString()
    name:string;

    @IsString()
    description:string;


}
