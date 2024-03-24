//Libary
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
} from '@nestjs/common';

import { News } from 'src/entities/News.entity';
import { NewsService } from './News.service';

@Controller('News')
export class NewsController {
  constructor(private Newservice: NewsService) {}

  //Ex: http://localhost:5000/News - GET
  @Get()
  async getAll(): Promise<News[]> {
    return this.Newservice.findAll();
  }

  //Ex: http://localhost:5000/News - POST
  @Post()
  async create(
    @Body() data: any,
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File;
      images?: Express.Multer.File[];
    },
  ): Promise<any> {
    return this.Newservice.create(data, files);
  }

  //Ex: http://localhost:5000/News/${id} - GET
  @Get(':id')
  async getById(@Param('id') id: string): Promise<News> {
    return this.Newservice.findById(id);
  }

  //Ex: http://localhost:5000/News/${id} - PUT
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: any,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
    },
  ): Promise<News> {
    return this.Newservice.update(id, data, files);
  }

  //Ex: http://localhost:5000/News/${id} - DELETE
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.Newservice.remove(id);
  }
}
