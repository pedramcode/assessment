import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export default class CompanyUpdateDto {
  @ApiProperty({ description: 'company name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'is active' })
  @IsBoolean()
  isActive: boolean;

  @ApiPropertyOptional({ description: 'phone number' })
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ description: 'description' })
  @IsString()
  @IsOptional()
  desc?: string;

  @ApiProperty({ description: 'plan id' })
  @IsUUID()
  planId: string;
}
