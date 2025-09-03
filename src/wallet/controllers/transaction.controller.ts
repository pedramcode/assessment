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
import TransactionService from '../services/transaction.service';
import TransactionCreateDto from '../dto/transaction.create';
import TransactionUpdateDto from '../dto/transaction.update';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('/admin/transaction')
@ApiTags('transaction')
export default class TransactionController {
  constructor(private readonly trxService: TransactionService) {}

  @Post()
  @ApiOperation({
    description: 'create a new transaction',
    summary: 'create transaction',
  })
  async create(@Body(new ValidationPipe()) body: TransactionCreateDto) {
    return this.trxService.create(body);
  }

  @Delete('/:id')
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'transaction id',
  })
  @ApiOperation({
    description: 'delete a transaction',
    summary: 'delete transaction',
  })
  async delete(@Param('id') id: string) {
    return this.trxService.delete(id);
  }

  @Put('/:id')
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'transaction id',
  })
  @ApiOperation({
    description: 'update a transaction',
    summary: 'update transaction',
  })
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) body: TransactionUpdateDto,
  ) {
    return this.trxService.update(id, body);
  }

  @Get('/:id')
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'transaction id',
  })
  @ApiOperation({
    description: 'get a transaction by id',
    summary: 'get transaction',
  })
  async get(@Param('id') id: string) {
    return this.trxService.get(id);
  }

  @Get('/balance/:companyId')
  @ApiParam({
    name: 'companyId',
    type: 'string',
    required: true,
    description: 'company id to calculate balance',
  })
  @ApiOperation({
    description: 'calculate balance of company',
    summary: 'get balance of company',
  })
  async getBalace(@Param('companyId') companyId: string) {
    return this.trxService.getBalanceCached(companyId);
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
    description: 'get all transactions',
    summary: 'get all transactions',
  })
  async getAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.trxService.getAll(page, limit);
  }
}
