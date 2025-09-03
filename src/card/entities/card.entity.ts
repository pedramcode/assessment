import BaseModel from 'src/common/models/BaseModel';
import Company from 'src/company/models/company.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import CardUsage from './cardUsage.entity';

@Entity()
export default class Card extends BaseModel {
  @ManyToOne(() => Company, (obj) => obj.cards)
  @JoinColumn()
  company: Company;

  @Column({
    type: 'varchar',
    length: 64,
  })
  ownerCode: string;

  @OneToMany(() => CardUsage, (obj) => obj.card)
  usages: CardUsage[];
}
