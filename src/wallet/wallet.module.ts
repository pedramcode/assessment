import { Module, OnModuleInit } from '@nestjs/common';
import Transaction from './entities/transaction.entitiy';
import { TypeOrmModule } from '@nestjs/typeorm';
import TransactionController from './controllers/transaction.controller';
import TransactionService from './services/transaction.service';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), CompanyModule],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class WalletModule implements OnModuleInit {
  constructor(private readonly trxService: TransactionService) {}

  onModuleInit() {
    void this.trxService.updateCacheAll();
  }
}
