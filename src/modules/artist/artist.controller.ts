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

import { Artist } from 'src/entities/artist.entity';
import { ArtistService } from './artist.service';
import { QueryParserPipe } from 'src/query/query-parser.pipe';

@Controller('Artist')
export class ArtistController {
  constructor(private Artistervice: ArtistService) {}

  //Ex: http://localhost:5000/Artist - GET
  @Get()
  @UsePipes(QueryParserPipe)
  async getAll(
    @Query() query?: string,
  ): Promise<{ data: Artist[]; total: number }> {
    return this.Artistervice.findAll(query);
  }

  //Ex: http://localhost:5000/Artist - POST
  @Post()
  async create(
    @Body() data: any,
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File;
      images?: Express.Multer.File[];
    },
  ): Promise<any> {
    return this.Artistervice.create(data, files);
  }

  //Ex: http://localhost:5000/Artist/${id} - GET
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Artist> {
    return this.Artistervice.findById(id);
  }

  //Ex: http://localhost:5000/Artist/${id} - PUT
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: any,
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File[];
    },
  ): Promise<Artist> {
    return this.Artistervice.update(id, data, files);
  }

  //Ex: http://localhost:5000/Artist/${id} - DELETE
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.Artistervice.remove(id);
  }
}
