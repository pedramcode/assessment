import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { TransactionType } from '../entities/transaction.entitiy';

export default class TransactionUpdateDto {
  @ApiProperty({ description: 'company id' })
  @IsUUID()
  companyId: string;

  @ApiProperty({ enum: TransactionType, description: 'transaction type' })
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiProperty({ description: 'amount' })
  @IsNumber()
  amount: number;

  @ApiPropertyOptional({ description: 'description' })
  @IsString()
  @IsOptional()
  desc?: string;
}
