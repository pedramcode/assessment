import { Injectable, NotFoundException } from '@nestjs/common';
import Card from '../entities/card.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import CardCreateDto from '../dto/card.create';
import CompanyService from 'src/company/company.service';
import CardUpdateDto from '../dto/card.update';

@Injectable()
export default class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepo: Repository<Card>,
    private readonly companyService: CompanyService,
  ) {}

  async create(data: CardCreateDto) {
    const company = await this.companyService.get(data.companyId);
    const res = await this.cardRepo.save({
      ...data,
      company,
    });
    return res;
  }

  async delete(id: string) {
    const card = await this.cardRepo.findOne({
      where: { id },
      relations: ['company'],
    });
    if (!card) {
      throw new NotFoundException('card not found');
    }
    const res = await this.cardRepo.remove(card);
    return res;
  }

  async get(id: string) {
    const card = await this.cardRepo.findOne({
      where: { id },
      relations: ['company'],
    });
    if (!card) {
      throw new NotFoundException('card not found');
    }
    return card;
  }

  async getAll(page: number, limit: number) {
    const cards = await this.cardRepo.find({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
      relations: ['company'],
    });
    return cards;
  }

  async update(id: string, data: CardUpdateDto) {
    const card = await this.get(id);
    const company = await this.companyService.get(data.companyId);
    const res = await this.cardRepo.save({
      ...card,
      ...data,
      company,
    });
    return res;
  }
}
