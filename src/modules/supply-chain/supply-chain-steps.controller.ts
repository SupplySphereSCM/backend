import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { CreateSupplyChainStepsDto } from "./dto/create-supply-chain-steps.dto";
import { SupplyChainStepsService } from "./supply-chain-steps.services";

@Controller('supplychain-steps')
@ApiTags('Supply Chain steps')
export class SupplyChainStepsController {
  constructor(private readonly supplyChainStepsService: SupplyChainStepsService ) {}

  @Post()
  create(@Body() createSupplyStepsChainDto:any) {
    
    
    return this.supplyChainStepsService.create(createSupplyStepsChainDto);
  }

  @Get()
  findAll() {
    return this.supplyChainStepsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplyChainStepsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    // @Body() updateSupplyChainDto: UpdateSupply,
  ) {
    // return this.supplyChainStepsService.update(id, updateSupplyChainDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplyChainStepsService.remove(id);
  }
}
