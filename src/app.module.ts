import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CompanyModule } from './company/company.module';
import { WalletModule } from './wallet/wallet.module';
import { WebhookModule } from './webhook/webhook.module';
import { PlanModule } from './plan/plan.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import SettingService from './common/services/setting.service';
import KeyvRedis from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import { CardModule } from './card/card.module';

import Company from './company/models/company.entity';
import Plan from './plan/entities/plan.entitiy';
import Transaction from './wallet/entities/transaction.entitiy';
import Card from './card/entities/card.entity';
import CardUsage from './card/entities/cardUsage.entity';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [SettingService],
      useFactory: (settingService: SettingService) => ({
        store: new KeyvRedis(settingService.redis_url),
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [SettingService],
      useFactory: (settingService: SettingService) => {
        return {
          type: 'postgres',
          host: settingService.database_host,
          port: settingService.database_port,
          database: settingService.database_name,
          username: settingService.database_user,
          password: settingService.database_password,
          entities: [Company, Plan, Transaction, Card, CardUsage],
          synchronize: settingService.environment === 'dev',
        };
      },
    }),
    CompanyModule,
    WalletModule,
    WebhookModule,
    PlanModule,
    CommonModule,
    CardModule,
  ],
  providers: [AppService],
})
export class AppModule {}
