//Libary
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//./
import { ImagesController } from './image.controller';
import { ImagesService } from './image.service';
//Repositories
import { ImagesRepository } from 'src/repositories/Images.repository';
import { ArtistRepository } from 'src/repositories/Artist.repository';
//Cloudinary
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
//Entities
import { Images, ImagesSchema } from 'src/entities/images.entity';
import { Artist, ArtistSchema } from 'src/entities/artist.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Images.name,
        schema: ImagesSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Artist.name,
        schema: ArtistSchema,
      },
    ]),
  ],
  controllers: [ImagesController],
  providers: [
    ImagesService,
    ImagesRepository,
    CloudinaryService,
    ArtistRepository,
  ],
  exports: [ImagesService, ImagesRepository, ArtistRepository],
})
export default class ImagesModule {}
