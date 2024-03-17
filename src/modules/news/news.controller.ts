import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { News } from 'src/entities/news.entity';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  //Ex: http://localhost:3000/Newss - GET
  @Get()
  async getAllNews(): Promise<News[]> {
    return this.newsService.findAll();
  }

  // Lấy một News cụ thể
  @Get(':id')
  async getNewsById(@Param('id') id: string): Promise<News> {
    return this.newsService.findById(id);
  }

  //Ex: http://localhost:3000/News - POST
  @Post('/createNews')
  async createNews(@Body() data: any): Promise<any> {
    return this.newsService.create(data);
  }

  // Cập nhật News
  @Put(':id')
  async updateNews(@Param('id') id: string, @Body() data: any): Promise<News> {
    return this.newsService.updateNews(id, data);
  }

  // Xóa News
  @Delete(':id')
  async deleteNews(@Param('id') id: string): Promise<void> {
    return this.newsService.removeNews(id);
  }
}
