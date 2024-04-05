//Libary
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//Entities
import { News } from 'src/entities/news.entity';

@Injectable()
export class NewsRepository {
  constructor(@InjectModel(News.name) private newsModel: Model<News>) {}

  async findAll(query: any): Promise<News[]> {
    const { filter, limit, sort, projection, population } = query;

    const page = query.page;
    const offset = (page - 1) * limit;
    delete filter.page;

    return await this.newsModel
      .find(filter)
      .skip(offset)
      .limit(limit)
      .sort(sort)
      .select(projection)
      .populate(population)
      .exec();
  }

  async create(data: News): Promise<News> {
    const createdNews = new this.newsModel(data);
    return createdNews.save();
  }

  async findById(id: string): Promise<News> {
    return this.newsModel.findById(id).exec();
  }

  async update(id: string, data: News): Promise<News> {
    const news = await this.newsModel.findById(id);

    if (!news) {
      return null;
    }

    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined) {
        news[key] = data[key];
      }
    });

    const updatedNews = await news.save();
    return updatedNews;
  }

  async remove(id: string): Promise<{ status: number; message: string }> {
    try {
      const news = await this.newsModel.findById(id);
      if (!news) {
        return { status: 404, message: 'News not found' };
      }

      const result = await this.newsModel.deleteOne({ _id: id });
      if (result.deletedCount > 0) {
        return { status: 204, message: 'News deleted successfully' };
      } else {
        return { status: 500, message: 'Failed to delete news' };
      }
    } catch (error) {
      throw error;
    }
  }
}
