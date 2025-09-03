import { Injectable } from '@nestjs/common';
import CardService from 'src/card/services/card.service';
import TransactionService from 'src/wallet/services/transaction.service';
import StationTransactionDto from './dto/stationTransaction';
import CardUsageService from 'src/card/services/cardUsage.service';
import { TransactionType } from 'src/wallet/entities/transaction.entitiy';
import { CardUsageType } from 'src/card/entities/cardUsage.entity';

@Injectable()
export class WebhookService {
  constructor(
    private readonly trxService: TransactionService,
    private readonly cardService: CardService,
    private readonly cardUsageService: CardUsageService,
  ) {}

  async submitTransaction(data: StationTransactionDto) {
    const card = await this.cardService.get(data.cardId);
    await this.trxService.checkWithdrawAllowed(card.company.id, data.price);
    await this.cardUsageService.checkUsageIsAllowed(card.id, data.amount);

    await this.trxService.create({
      amount: data.price,
      type: TransactionType.withdraw,
      companyId: card.company.id,
    });
    await this.cardUsageService.create({
      amount: data.amount,
      cardId: card.id,
      price: data.price,
      stationId: data.stationId,
      type: CardUsageType.approved,
    });

    return { message: 'transaction was successful' };
  }
}
