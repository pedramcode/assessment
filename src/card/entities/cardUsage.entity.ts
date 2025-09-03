import BaseModel from 'src/common/models/BaseModel';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Card from './card.entity';

export enum CardUsageType {
  approved = 'approved',
  denied = 'denied',
  unset = 'unset',
}

@Entity()
export default class CardUsage extends BaseModel {
  @ManyToOne(() => Card, (obj) => obj.usages)
  @JoinColumn()
  card: Card;

  @Column({
    type: 'integer',
  })
  amount: number;

  @Column({
    type: 'integer',
  })
  price: number;

  @Column({
    type: 'varchar',
    length: 64,
  })
  stationId: string;

  @Column({
    type: 'enum',
    enum: CardUsageType,
    default: CardUsageType.unset,
  })
  type: CardUsageType;
}
