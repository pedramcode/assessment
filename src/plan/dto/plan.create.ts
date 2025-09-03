import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export default class PlanCreateDto {
  @ApiProperty({ description: 'plan name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'description' })
  @IsString()
  @IsOptional()
  desc?: string;

  @ApiProperty({ description: "plan's monthly price" })
  @IsNumber()
  price: number;

  @ApiProperty({ description: "plan's daily cards limit" })
  @IsNumber()
  cardsDailyLimit: number;

  @ApiProperty({ description: "plan's monthly cards limit" })
  @IsNumber()
  cardsMonthlyLimit: number;
}
