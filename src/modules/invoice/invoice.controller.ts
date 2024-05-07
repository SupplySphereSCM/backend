import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { ApiTags } from '@nestjs/swagger';
import { QueryObjectDto } from 'src/common/dto/query.dto';

@Controller('invoice')
@ApiTags('Invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(createInvoiceDto);
  }

  @Get()
  findAll(query?: QueryObjectDto) {
    return this.invoiceService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceService.update(id, updateInvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceService.remove(id);
  }
}
