import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export default class CardUpdateDto {
  @ApiProperty({ description: 'company id' })
  @IsUUID()
  companyId: string;

  @ApiProperty({ description: 'owner code' })
  @IsString()
  ownerCode: string;
}
