//Libary
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//Entities
import { News } from 'src/entities/news.entity';

@Injectable()
export class NewsRepository {
  constructor(@InjectModel(News.name) private NewsModel: Model<News>) {}

  async findAll(): Promise<News[]> {
    return this.NewsModel.find().exec();
  }

  async create(data: News): Promise<News> {
    const newEmmloyee = new this.NewsModel(data);
    return newEmmloyee.save();
  }

  async findById(id: string): Promise<News> {
    return this.NewsModel.findById(id).exec();
  }

  async update(id: string, data: News): Promise<News> {
    const News = await this.NewsModel.findById(id);

    if (!News) {
      return null;
    }

    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined) {
        News[key] = data[key];
      }
    });

    const updatedNews = await News.save();
    return updatedNews;
  }

  async remove(id: string): Promise<{ status: number; message: string }> {
    try {
      const news = await this.NewsModel.findById(id);
      if (!news) {
        return { status: 404, message: 'News not found' };
      }

      const result = await this.NewsModel.deleteOne({ _id: id });
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
