import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import CardUsageCreateDto from '../dto/cardUsage.create';
import CardUsageService from '../services/cardUsage.service';
import CardUsageUpdateDto from '../dto/cardUsage.update';

@Controller('/admin/card-usage')
@ApiTags('card')
export default class CardUsageController {
  constructor(private readonly usageService: CardUsageService) {}

  @Post()
  @ApiOperation({
    description: 'create a new card usage record',
    summary: 'create card usage',
  })
  async create(@Body(new ValidationPipe()) body: CardUsageCreateDto) {
    return this.usageService.create(body);
  }

  @Delete('/:id')
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'usage id',
  })
  @ApiOperation({
    description: 'delete a card usage',
    summary: 'delete card usage',
  })
  async delete(@Param('id') id: string) {
    return this.usageService.delete(id);
  }

  @Put('/:id')
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'usage id',
  })
  @ApiOperation({
    description: 'update a usage',
    summary: 'update usage',
  })
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) body: CardUsageUpdateDto,
  ) {
    return this.usageService.update(id, body);
  }

  @Get('/:id')
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'usage id',
  })
  @ApiOperation({
    description: 'get a card usage by id',
    summary: 'get card usage',
  })
  async get(@Param('id') id: string) {
    return this.usageService.get(id);
  }

  @Get()
  @ApiQuery({
    name: 'page',
    type: 'number',
    description: 'page',
    default: 1,
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    description: 'limit',
    default: 10,
  })
  @ApiOperation({
    description: 'get all card usages',
    summary: 'get all card usages',
  })
  async getAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.usageService.getAll(page, limit);
  }
}
