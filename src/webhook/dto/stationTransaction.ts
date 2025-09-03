import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export default class StationTransactionDto {
  @ApiProperty({ description: 'card id' })
  @IsUUID()
  cardId: string;

  @ApiProperty({ description: 'amount in liters' })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'price' })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'station ID' })
  @IsString()
  stationId: string;
}
