import BaseModel from 'src/common/models/BaseModel';
import Company from 'src/company/models/company.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export default class Plan extends BaseModel {
  @Column({
    type: 'varchar',
    length: 32,
  })
  name: string;

  @Column({
    type: 'integer',
  })
  price: number;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
  })
  desc: string | null;

  @Column({
    type: 'integer',
  })
  cardsDailyLimit: number;

  @Column({
    type: 'integer',
  })
  cardsMonthlyLimit: number;

  @OneToMany(() => Company, (obj) => obj.plan)
  companies: Company[];
}
