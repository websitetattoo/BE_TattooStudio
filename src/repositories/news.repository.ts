import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News } from 'src/entities/news.entity';

@Injectable()
export class NewsRepository {
  constructor(@InjectModel(News.name) private newsModel: Model<News>) {}

  async findAll(): Promise<News[]> {
    return this.newsModel.find().exec();
  }

  async findById(id: string): Promise<News> {
    return this.newsModel.findById(id).exec();
  }

  async createNews(data: News): Promise<News> {
    const newEmployee = new this.newsModel(data);
    return newEmployee.save();
  }

  async updateNews(id: string, data: News): Promise<News> {
    // Kiểm tra xem News có tồn tại không
    const existingNews = await this.findById(id);
    if (!existingNews) {
      throw new NotFoundException(`News with ID ${id} not found.`);
    }

    // Cập nhật dữ liệu của News
    const updatedNews = await this.newsModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();

    return updatedNews;
  }

  async removeNews(id: string): Promise<void> {
    await this.newsModel.findByIdAndDelete(id).exec();
  }
}
