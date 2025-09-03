import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository, Between } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import CardUsage, { CardUsageType } from '../entities/cardUsage.entity';
import CardService from './card.service';
import CardUsageCreateDto from '../dto/cardUsage.create';
import CardUsageUpdateDto from '../dto/cardUsage.update';
import CompanyService from 'src/company/company.service';

@Injectable()
export default class CardUsageService {
  constructor(
    @InjectRepository(CardUsage)
    private readonly usageRepo: Repository<CardUsage>,
    private readonly cardService: CardService,
    private readonly companyService: CompanyService,
  ) {}

  // !!! This function supposed to read data from cache, but due to limited time for this assessment I had to do it dirty way!
  // an example of implemented caching is wallet balance
  async checkUsageIsAllowed(cardId: string, amount: number) {
    const card = await this.cardService.get(cardId);
    const plan = await this.companyService.getActivePlan(card.company.id);
    if (!plan) {
      throw new BadRequestException(
        "card's organization have not any active plan",
      );
    }
    const todayUsage = await this.getSumAmountApprovedToday(cardId);
    const monthUsage = await this.getSumAmountApprovedThisMonth(cardId);

    if (todayUsage + amount > plan.cardsDailyLimit) {
      throw new HttpException("you've reached your daily limit", 429);
    }
    if (monthUsage + amount > plan.cardsMonthlyLimit) {
      throw new HttpException("you've reached your monthly limit", 429);
    }
  }

  async create(data: CardUsageCreateDto) {
    const card = await this.cardService.get(data.cardId);
    const res = await this.usageRepo.save({
      ...data,
      card,
    });
    return res;
  }

  async delete(id: string) {
    const usage = await this.get(id);
    const res = await this.usageRepo.remove(usage);
    return res;
  }

  async get(id: string) {
    const card = await this.usageRepo.findOne({
      where: { id },
      relations: ['card'],
    });
    if (!card) {
      throw new NotFoundException('card usage not found');
    }
    return card;
  }

  async getAll(page: number, limit: number) {
    const cards = await this.usageRepo.find({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
      relations: ['card'],
    });
    return cards;
  }

  async update(id: string, data: CardUsageUpdateDto) {
    const usage = await this.get(id);
    const card = await this.cardService.get(data.cardId);
    const res = await this.usageRepo.save({
      ...usage,
      ...data,
      card,
    });
    return res;
  }

  async getApprovedUsagesToday(cardId: string) {
    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0,
    );
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999,
    );

    return await this.usageRepo.find({
      where: {
        card: { id: cardId },
        type: CardUsageType.approved,
        createdAt: Between(startOfDay, endOfDay),
      },
      relations: ['card'],
      order: { createdAt: 'DESC' },
    });
  }

  async getApprovedUsagesThisMonth(cardId: string) {
    const now = new Date();
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1,
      0,
      0,
      0,
      0,
    );
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999,
    );

    return await this.usageRepo.find({
      where: {
        card: { id: cardId },
        type: CardUsageType.approved,
        createdAt: Between(startOfMonth, endOfMonth),
      },
      relations: ['card'],
      order: { createdAt: 'DESC' },
    });
  }

  async getSumAmountApprovedToday(cardId: string) {
    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0,
    );
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999,
    );

    const result: { sum: number } | undefined = await this.usageRepo
      .createQueryBuilder('usage')
      .select('SUM(usage.amount)', 'sum')
      .where('usage.type = :type', { type: CardUsageType.approved })
      .andWhere('usage.cardId = :cardId', { cardId })
      .andWhere('usage.createdAt BETWEEN :start AND :end', {
        start: startOfDay,
        end: endOfDay,
      })
      .getRawOne();

    if (!result) return 0;

    return result.sum ?? 0;
  }

  async getSumAmountApprovedThisMonth(cardId: string) {
    const now = new Date();
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1,
      0,
      0,
      0,
      0,
    );
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999,
    );

    const result: { sum: number } | undefined = await this.usageRepo
      .createQueryBuilder('usage')
      .select('SUM(usage.amount)', 'sum')
      .where('usage.type = :type', { type: CardUsageType.approved })
      .andWhere('usage.cardId = :cardId', { cardId })
      .andWhere('usage.createdAt BETWEEN :start AND :end', {
        start: startOfMonth,
        end: endOfMonth,
      })
      .getRawOne();

    if (!result) return 0;

    return result.sum ?? 0;
  }
}
