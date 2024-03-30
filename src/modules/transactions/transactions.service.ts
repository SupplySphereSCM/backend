import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}
  async create(createTransactionDto: CreateTransactionDto) {
    const newTransaction =
      this.transactionRepository.create(createTransactionDto);
    this.transactionRepository.save(newTransaction);
    return newTransaction;
  }

  async findAll() {
    return this.transactionRepository.find();
  }

  async findOne(id: string) {
    const transa = await this.transactionRepository.findOne({
      where: { transaction_id: id },
    });
    if (!transa) {
      throw new NotFoundException(`invalid transaction id`);
    }
    return transa;
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const user = await this.findOne(id);
    Object.assign(user, updateTransactionDto);
    return this.transactionRepository.save(user);
  }

  async remove(id: string) {
    const transac = await this.findOne(id);
    return this.transactionRepository.remove(transac);
  }
}
