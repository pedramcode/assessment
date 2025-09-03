import BaseModel from 'src/common/models/BaseModel';
import Company from 'src/company/models/company.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

export enum TransactionType {
  deposit = 'deposit',
  withdraw = 'withdraw',
}

@Entity()
export default class Transaction extends BaseModel {
  @ManyToOne(() => Company, (obj) => obj.transactions)
  @JoinColumn()
  company: Company;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type: TransactionType;

  @Column({
    type: 'integer',
  })
  amount: number;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
  })
  desc: string | null;
}
