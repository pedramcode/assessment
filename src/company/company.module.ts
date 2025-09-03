import { Module } from '@nestjs/common';
import CompanyService from './company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Company from './models/company.entity';
import CompanyController from './company.controller';
import { PlanModule } from 'src/plan/plan.module';

@Module({
  imports: [TypeOrmModule.forFeature([Company]), PlanModule],
  providers: [CompanyService],
  controllers: [CompanyController],
  exports: [CompanyService],
})
export class CompanyModule {}
