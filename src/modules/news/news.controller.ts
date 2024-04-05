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
  UploadedFiles,
  UsePipes,
} from '@nestjs/common';

import { News } from 'src/entities/News.entity';
import { NewsService } from './News.service';
import { QueryParserPipe } from 'src/query/query-parser.pipe';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  //Ex: http://localhost:5000/news - GET
  @Get()
  @UsePipes(QueryParserPipe)
  async getAll(@Query() query?: string): Promise<News[]> {
    return this.Newservice.findAll(query);
  }

  //Ex: http://localhost:5000/news - POST
  @Post('/create')
  async create(
    @Body() data: any,
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File;
      images?: Express.Multer.File[];
    },
  ): Promise<any> {
    return this.newsService.create(data, files);
  }

  //Ex: http://localhost:5000/news/${id} - GET
  @Get(':id')
  async getById(@Param('id') id: any): Promise<News> {
    return this.newsService.findById(id);
  }

  //Ex: http://localhost:5000/news/${id} - PUT
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: any,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
    },
  ): Promise<News> {
    return this.newsService.update(id, data, files);
  }

  //Ex: http://localhost:5000/news/${id} - DELETE
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.newsService.remove(id);
  }
}
