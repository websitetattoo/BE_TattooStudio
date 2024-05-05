//Libary
import { Body, Controller, Post, UploadedFiles } from '@nestjs/common';
import { ImagesService } from './image.service';

@Controller('Images')
export class ImagesController {
  constructor(private ImagesService: ImagesService) {}

  @Post()
  async updateImagesArtis(
    @Body() data: any,
    @UploadedFiles()
    file: {
      image?: Express.Multer.File;
    },
  ): Promise<string> {
    return this.ImagesService.updateImagesArtis(data, file);
  }
}
