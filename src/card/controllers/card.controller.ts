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
import CardService from '../services/card.service';
import CardCreateDto from '../dto/card.create';
import CardUpdateDto from '../dto/card.update';

@Controller('/admin/card')
@ApiTags('card')
export default class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @ApiOperation({
    description: 'create a new card',
    summary: 'create card',
  })
  async create(@Body(new ValidationPipe()) body: CardCreateDto) {
    return this.cardService.create(body);
  }

  @Delete('/:id')
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'card id',
  })
  @ApiOperation({
    description: 'delete a card',
    summary: 'delete card',
  })
  async delete(@Param('id') id: string) {
    return this.cardService.delete(id);
  }

  @Put('/:id')
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'card id',
  })
  @ApiOperation({
    description: 'update a card',
    summary: 'update card',
  })
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) body: CardUpdateDto,
  ) {
    return this.cardService.update(id, body);
  }

  @Get('/:id')
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'card id',
  })
  @ApiOperation({
    description: 'get a card by id',
    summary: 'get card',
  })
  async get(@Param('id') id: string) {
    return this.cardService.get(id);
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
    description: 'get all cards',
    summary: 'get all cards',
  })
  async getAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.cardService.getAll(page, limit);
  }
}
