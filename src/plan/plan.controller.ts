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
import PlanCreateDto from './dto/plan.create';
import PlanService from './plan.service';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import PlanUpdateDto from './dto/plan.update';

@Controller('/admin/plan')
@ApiTags('plan')
export default class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  @ApiOperation({
    description: 'create a new plan',
    summary: 'create plan',
  })
  async create(@Body(new ValidationPipe()) body: PlanCreateDto) {
    return this.planService.create(body);
  }

  @Delete('/:id')
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'plan id',
  })
  @ApiOperation({
    description: 'delete a plan',
    summary: 'delete plan',
  })
  async delete(@Param('id') id: string) {
    return this.planService.delete(id);
  }

  @Put('/:id')
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'plan id',
  })
  @ApiOperation({
    description: 'update a plan',
    summary: 'update plan',
  })
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) body: PlanUpdateDto,
  ) {
    return this.planService.update(id, body);
  }

  @Get('/:id')
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'plan id',
  })
  @ApiOperation({
    description: 'get a plan by id',
    summary: 'get plan',
  })
  async get(@Param('id') id: string) {
    return this.planService.get(id);
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
    description: 'get all plans',
    summary: 'get all plans',
  })
  async getAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.planService.getAll(page, limit);
  }
}
