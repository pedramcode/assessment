import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import StationTransactionDto from './dto/stationTransaction';
import { WebhookService } from './webhook.service';

@Controller('webhook')
@ApiTags('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('/station-transaction')
  async stationTransaction(
    @Body(new ValidationPipe()) body: StationTransactionDto,
  ) {
    return this.webhookService.submitTransaction(body);
  }
}
