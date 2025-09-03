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
import CompanyCreateDto from './dto/company.create';
import CompanyService from './company.service';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import CompanyUpdateDto from './dto/company.update';

@Controller('/admin/company')
@ApiTags('company')
export default class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({
    description: 'create a new company',
    summary: 'create company',
  })
  async create(@Body(new ValidationPipe()) body: CompanyCreateDto) {
    return this.companyService.create(body);
  }

  @Delete('/:id')
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'company id',
  })
  @ApiOperation({
    description: 'create a new company',
    summary: 'create company',
  })
  async delete(@Param('id') id: string) {
    return this.companyService.delete(id);
  }

  @Put('/:id')
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'company id',
  })
  @ApiOperation({
    description: 'update a company',
    summary: 'update company',
  })
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) body: CompanyUpdateDto,
  ) {
    return this.companyService.update(id, body);
  }

  @Get('/:id')
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'company id',
  })
  @ApiOperation({
    description: 'get a company by id',
    summary: 'get company',
  })
  async get(@Param('id') id: string) {
    return this.companyService.get(id);
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
    description: 'get all companies',
    summary: 'get all companies',
  })
  async getAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.companyService.getAll(page, limit);
  }
}
