//Libary
import { Body, Controller, Put, UploadedFiles } from '@nestjs/common';
import { ImagesService } from './image.service';

@Controller('Images')
export class ImagesController {
  constructor(private ImagesService: ImagesService) {}

  @Put()
  async updateImagesArtis(
    @Body() data: any,
    @UploadedFiles()
    file: {
      url?: Express.Multer.File[];
    },
  ): Promise<string> {
    return this.ImagesService.updateImagesArtis(data, file);
  }
}
