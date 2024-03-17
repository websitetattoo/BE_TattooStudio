import { Injectable, NotFoundException } from '@nestjs/common';
import { News } from 'src/entities/news.entity';
import { NewsRepository } from 'src/repositories/news.repository';

@Injectable()
export class NewsService {
  constructor(private newsRepository: NewsRepository) {}

  async findAll(): Promise<News[]> {
    return this.newsRepository.findAll();
  }

  async create(data: any): Promise<News> {
    try {
      const news: News = {
        ...data,
      };
      const createNews = await this.newsRepository.createNews(news);

      return createNews;
    } catch (error) {
      throw error; // Rethrow the error for handling at a higher level
    }
  }

  async findById(id: string): Promise<News> {
    const news = await this.newsRepository.findById(id);
    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found.`);
    }
    return news;
  }

  async updateNews(id: string, data: News): Promise<News> {
    return await this.newsRepository.updateNews(id, data);
  }

  async removeNews(id: string): Promise<void> {
    await this.newsRepository.removeNews(id);
  }
}
