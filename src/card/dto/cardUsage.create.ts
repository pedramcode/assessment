import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';
import { CardUsageType } from '../entities/cardUsage.entity';

export default class CardUsageCreateDto {
  @ApiProperty({ description: 'card id' })
  @IsUUID()
  cardId: string;

  @ApiProperty({ description: 'amount' })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'price' })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'station ID' })
  @IsString()
  stationId: string;

  @ApiProperty({ enum: CardUsageType, description: 'card usage type' })
  @IsEnum(CardUsageType)
  type: CardUsageType;
}
