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
import { Artist } from 'src/entities/artist.entity';
import { ArtistService } from './artist.service';

@Controller('Artist')
export class ArtistController {
  constructor(private Artistervice: ArtistService) {}

  //Ex: http://localhost:3001/Artist - GET
  @Get()
  async getAllArtist(): Promise<Artist[]> {
    return this.Artistervice.findAll();
  }

  //Ex: http://localhost:3001/Artist - POST
  @Post()
  async createArtist(
    @Body() data: any,
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File;
      images?: Express.Multer.File[];
    },
  ): Promise<any> {
    return this.Artistervice.create(data, files);
  }

  //Ex: http://localhost:3001/Artist/${id} - GET
  @Get(':id')
  async getArtistById(@Param('id') id: string): Promise<Artist> {
    return this.Artistervice.findById(id);
  }

  //Ex: http://localhost:3001/Artist/${id} - PUT
  @Put(':id')
  async updateArtist(
    @Param('id') id: string,
    @Body() data: any,
  ): Promise<Artist> {
    return this.Artistervice.updateArtist(id, data);
  }

  //Ex: http://localhost:3001/Artist/${id} - DELETE
  @Delete(':id')
  async removeArtist(@Param('id') id: string): Promise<void> {
    return this.Artistervice.removeArtist(id);
  }
}
