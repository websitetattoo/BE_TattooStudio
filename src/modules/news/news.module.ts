//Libary
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//./
import { NewsService } from './News.service';
import { NewsController } from './News.controller';
//.Entities
import { News, NewsSchema } from 'src/entities/News.entity';
//Cloudinary
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
//Repositories
import { NewsRepository } from 'src/repositories/news.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: News.name,
        schema: NewsSchema,
      },
    ]),
  ],
  controllers: [NewsController],
  providers: [NewsRepository, NewsService, CloudinaryService],
  exports: [NewsService, NewsRepository],
})
export default class NewsModule {}
