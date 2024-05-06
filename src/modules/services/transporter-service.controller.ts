import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { User } from '../users/entities/user.entity';
import { TransporterServicesService } from './transporter.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

import { QueryObjectDto } from 'src/common/dto/query.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { CreateTransporterServiceDto } from './dto/create-transporterservice.dto';

@Controller('transporter')
@ApiTags('Transporter')
export class TransporterController {
  constructor(
    private readonly TransporterService: TransporterServicesService,
  ) {}

  @Post()
  create(
    @Body() createTransporterServiceDto: CreateTransporterServiceDto,
    @CurrentUser() user: User,
  ) {
    return this.TransporterService.create(createTransporterServiceDto, user);
  }

  @Get()
  findAll(@Query() query: QueryObjectDto) {
    return this.TransporterService.findAll(query);
  }

  @Get('user')
  findUserServices(@CurrentUser() user:User) {
    return this.TransporterService.findUserServices(user)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.TransporterService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.TransporterService.update(id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.TransporterService.remove(id);
  }
}
