import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Images, ImagesSchema } from 'src/entities/images.entity';
import { ImagesRepository } from 'src/repositories/images.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Images.name,
        schema: ImagesSchema,
      },
    ]),
  ],
  providers: [ImagesRepository],
})
export default class ImagesModule {}
