import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { News, NewsSchema } from 'src/entities/news.entity';
import { NewsRepository } from 'src/repositories/news.repository';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';

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
  providers: [NewsRepository, NewsService],
  exports: [NewsService, NewsRepository],
})
export default class NewsModule {}
