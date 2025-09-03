import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { CardModule } from 'src/card/card.module';
import { WalletModule } from 'src/wallet/wallet.module';

@Module({
  imports: [CardModule, WalletModule],
  providers: [WebhookService],
  controllers: [WebhookController],
})
export class WebhookModule {}
