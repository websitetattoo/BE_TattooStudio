//Libary
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';

import { Faq } from 'src/entities/Faq.entity';
import { FaqService } from './Faq.service';
import { QueryParserPipe } from 'src/query/query-parser.pipe';

@Controller('Faq')
export class FaqController {
  constructor(private FaqService: FaqService) {}

  //Ex: http://localhost:5000/Faq - GET
  @Get()
  @UsePipes(QueryParserPipe)
  async getAll(
    @Query() query?: string,
  ): Promise<{ data: Faq[]; total: number }> {
    return this.FaqService.findAll(query);
  }

  //Ex: http://localhost:5000/Faq - POST
  @Post()
  async create(@Body() data: any): Promise<any> {
    return this.FaqService.create(data);
  }

  //Ex: http://localhost:5000/Faq/${id} - GET
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Faq> {
    return this.FaqService.findById(id);
  }

  //Ex: http://localhost:5000/Faq/${id} - PUT
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any): Promise<Faq> {
    return this.FaqService.update(id, data);
  }

  //Ex: http://localhost:5000/Faq/${id} - DELETE
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.FaqService.remove(id);
  }
}
