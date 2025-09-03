import BaseModel from 'src/common/models/BaseModel';
import Plan from 'src/plan/entities/plan.entitiy';
import Transaction from 'src/wallet/entities/transaction.entitiy';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export default class Company extends BaseModel {
  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'boolean',
    default: true,
    nullable: false,
  })
  isActive: boolean;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: true,
  })
  phone: string | null;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
  })
  desc: string | null;

  @ManyToOne(() => Plan, (obj) => obj.companies)
  @JoinColumn()
  plan?: Plan;

  @OneToMany(() => Transaction, (obj) => obj.company)
  transactions: Transaction[];
}
