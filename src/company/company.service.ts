import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Company from './models/company.entity';
import { Repository } from 'typeorm';
import CompanyCreateDto from './dto/company.create';
import CompanyUpdateDto from './dto/company.update';
import PlanService from 'src/plan/plan.service';
import Plan from 'src/plan/entities/plan.entitiy';

@Injectable()
export default class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
    private readonly planService: PlanService,
  ) {}

  async create(data: CompanyCreateDto) {
    let plan: Plan | undefined;
    if (data.planId) {
      plan = await this.planService.get(data.planId);
    }
    return this.companyRepo.save({
      ...data,
      plan: plan ?? undefined,
    });
  }

  async delete(id: string) {
    const company = await this.companyRepo.findOne({ where: { id } });
    if (!company) {
      throw new NotFoundException('company not found');
    }
    return this.companyRepo.remove(company);
  }

  async get(id: string) {
    const company = await this.companyRepo.findOne({ where: { id } });
    if (!company) {
      throw new NotFoundException('company not found');
    }
    return company;
  }

  async getAll(page: number, limit: number) {
    const company = await this.companyRepo.find({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
      relations: ['plan'],
    });
    return company;
  }

  async update(id: string, data: CompanyUpdateDto) {
    const company = await this.companyRepo.findOne({ where: { id } });
    if (!company) {
      throw new NotFoundException('company not found');
    }
    let plan: Plan | undefined;
    if (data.planId) {
      plan = await this.planService.get(data.planId);
    }
    return this.companyRepo.save({
      ...company,
      ...data,
      plan: plan ?? company.plan,
    });
  }
}
