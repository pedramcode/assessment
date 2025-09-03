import { Injectable, NotFoundException } from '@nestjs/common';
import Plan from './entities/plan.entitiy';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PlanCreateDto from './dto/plan.create';
import PlanUpdateDto from './dto/plan.update';

@Injectable()
export default class PlanService {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepo: Repository<Plan>,
  ) {}

  async create(data: PlanCreateDto) {
    return this.planRepo.save(data);
  }

  async delete(id: string) {
    const plan = await this.planRepo.findOne({ where: { id } });
    if (!plan) {
      throw new NotFoundException('plan not found');
    }
    return this.planRepo.remove(plan);
  }

  async get(id: string) {
    const plan = await this.planRepo.findOne({ where: { id } });
    if (!plan) {
      throw new NotFoundException('plan not found');
    }
    return plan;
  }

  async getAll(page: number, limit: number) {
    const plans = await this.planRepo.find({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return plans;
  }

  async update(id: string, data: PlanUpdateDto) {
    const plan = await this.planRepo.findOne({ where: { id } });
    if (!plan) {
      throw new NotFoundException('plan not found');
    }
    return this.planRepo.save({
      ...plan,
      ...data,
    });
  }
}
