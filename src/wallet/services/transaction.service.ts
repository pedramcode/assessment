import { Injectable, NotFoundException } from '@nestjs/common';
import Transaction, { TransactionType } from '../entities/transaction.entitiy';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import TransactionCreateDto from '../dto/transaction.create';
import TransactionUpdateDto from '../dto/transaction.update';
import CompanyService from 'src/company/company.service';

@Injectable()
export default class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly trxRepo: Repository<Transaction>,
    private readonly companyService: CompanyService,
  ) {}

  async create(data: TransactionCreateDto) {
    const company = await this.companyService.get(data.companyId);
    return this.trxRepo.save({
      ...data,
      company,
    });
  }

  async delete(id: string) {
    const trx = await this.trxRepo.findOne({ where: { id } });
    if (!trx) {
      throw new NotFoundException('transaction not found');
    }
    return this.trxRepo.remove(trx);
  }

  async get(id: string) {
    const trx = await this.trxRepo.findOne({
      where: { id },
      relations: ['company'],
    });
    if (!trx) {
      throw new NotFoundException('transaction not found');
    }
    return trx;
  }

  async getAll(page: number, limit: number) {
    const trxs = await this.trxRepo.find({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
      relations: ['company'],
    });
    return trxs;
  }

  async update(id: string, data: TransactionUpdateDto) {
    const trx = await this.trxRepo.findOne({ where: { id } });
    if (!trx) {
      throw new NotFoundException('transaction not found');
    }
    const company = await this.companyService.get(data.companyId);
    return this.trxRepo.save({
      ...trx,
      ...data,
      company,
    });
  }

  async getBalance(companyId: string) {
    await this.companyService.get(companyId);
    return await this.trxRepo.manager.transaction(async (manager) => {
      const depositSum: { sum: number } | undefined = await manager
        .createQueryBuilder('Transaction', 'trx')
        .select('COALESCE(SUM(trx.amount), 0)', 'sum')
        .where('trx.companyId = :companyId', { companyId })
        .andWhere('trx.type = :type', { type: TransactionType.deposit })
        .getRawOne();

      const withdrawSum: { sum: number } | undefined = await manager
        .createQueryBuilder('Transaction', 'trx')
        .select('COALESCE(SUM(trx.amount), 0)', 'sum')
        .where('trx.companyId = :companyId', { companyId })
        .andWhere('trx.type = :type', { type: TransactionType.withdraw })
        .getRawOne();

      const deposit = depositSum?.sum ?? 0;
      const withdraw = withdrawSum?.sum ?? 0;
      return { balance: Number(deposit) - Number(withdraw) };
    });
  }
}
