import { Module } from '@nestjs/common';
import Card from './entities/card.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import CardService from './services/card.service';
import { CompanyModule } from 'src/company/company.module';
import CardController from './controllers/card.controller';
import CardUsage from './entities/cardUsage.entity';
import CardUsageController from './controllers/cardUsage.controller';
import CardUsageService from './services/cardUsage.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Card]),
    TypeOrmModule.forFeature([CardUsage]),
    CompanyModule,
  ],
  providers: [CardService, CardUsageService],
  controllers: [CardController, CardUsageController],
  exports: [CardService, CardUsageService],
})
export class CardModule {}
