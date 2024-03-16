import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from 'src/entities/artist.entity';
import { ArtistRepository } from 'src/repositories/Artist.repository';
import { ArtistService } from './artist.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ArtistController } from './artist.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Artist.name,
        schema: ArtistSchema,
      },
    ]),
  ],
  controllers: [ArtistController],
  providers: [ArtistRepository, ArtistService, CloudinaryService],
  exports: [ArtistService, ArtistRepository],
})
export default class ArtistModule {}
