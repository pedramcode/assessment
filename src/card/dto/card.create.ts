import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export default class CardCreateDto {
  @ApiProperty({ description: 'company id' })
  @IsUUID()
  companyId: string;

  @ApiProperty({ description: 'owner code' })
  @IsString()
  ownerCode: string;
}
