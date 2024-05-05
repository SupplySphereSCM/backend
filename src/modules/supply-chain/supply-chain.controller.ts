import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SupplyChainService } from './supply-chain.service';
import { CreateSupplyChainDto } from './dto/create-supply-chain.dto';
import { UpdateSupplyChainDto } from './dto/update-supply-chain.dto';

import { ApiTags } from '@nestjs/swagger';

@Controller('supplychains')
@ApiTags('Supply Chain')
export class SupplyChainController {
  constructor(private readonly supplyChainService: SupplyChainService) {}

  @Post()
  create(@Body() createSupplyChainDto: CreateSupplyChainDto) {
    return this.supplyChainService.create(createSupplyChainDto);
  }

  @Get()
  findAll() {
    return this.supplyChainService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplyChainService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSupplyChainDto: UpdateSupplyChainDto,
  ) {
    return this.supplyChainService.update(id, updateSupplyChainDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplyChainService.remove(id);
  }
}
