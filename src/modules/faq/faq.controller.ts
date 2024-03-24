//Libary
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Faq } from 'src/entities/Faq.entity';
import { FaqService } from './Faq.service';

@Controller('Faq')
export class FaqController {
  constructor(private Faqervice: FaqService) {}

  //Ex: http://localhost:5000/Faq - GET
  @Get()
  async getAll(): Promise<Faq[]> {
    return this.Faqervice.findAll();
  }

  //Ex: http://localhost:5000/Faq - POST
  @Post()
  async create(@Body() data: any): Promise<any> {
    return this.Faqervice.create(data);
  }

  //Ex: http://localhost:5000/Faq/${id} - GET
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Faq> {
    return this.Faqervice.findById(id);
  }

  //Ex: http://localhost:5000/Faq/${id} - PUT
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any): Promise<Faq> {
    return this.Faqervice.update(id, data);
  }

  //Ex: http://localhost:5000/Faq/${id} - DELETE
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.Faqervice.remove(id);
  }
}
