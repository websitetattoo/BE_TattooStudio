//Libary
import { Injectable, NotFoundException } from '@nestjs/common';
//Cloudinary
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
//Repositories
import { NewsRepository } from 'src/repositories/news.repository';
//Entities
import { News } from 'src/entities/News.entity';

@Injectable()
export class NewsService {
  constructor(
    private NewsRepository: NewsRepository,
    private cloudinaryService: CloudinaryService,
  ) {}

  async findAll(query: any = {}): Promise<News[]> {
    return this.NewsRepository.findAll(query);
  }

  async create(data: any, files: any): Promise<News> {
    try {
      const uploadImages = files.map((file: any) => {
        return this.cloudinaryService.uploadImage(file);
      });
      const uploadResult = await Promise.all(uploadImages);

      const newNews: News = {
        ...data,
        image: uploadResult[0]?.secure_url,
      };
      const createNews = await this.NewsRepository.create(newNews);

      return createNews;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<News> {
    const News = await this.NewsRepository.findById(id);
    if (!News) {
      throw new NotFoundException(`News with ID ${id} not found.`);
    }
    return News;
  }

  async update(id: string, data: any, files: any): Promise<News> {
    try {
      // Truy vấn News cũ để lấy đường dẫn ảnh cũ từ db
      const oldNews = await this.NewsRepository.findById(id);
      if (!oldNews) {
        throw new Error('Image news not found');
      }
      // Xoá ảnh cũ trên Cloudinary
      if (oldNews.image) {
        await this.cloudinaryService.deleteImage(oldNews.image);
      }

      const uploadImages = files.map((file: any) => {
        return this.cloudinaryService.uploadImage(file);
      });
      const uploadResult = await Promise.all(uploadImages);

      const newData: News = {
        ...data,
        image: uploadResult[0]?.secure_url,
      };

      return await this.NewsRepository.update(id, newData);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    const oldNews = await this.NewsRepository.findById(id);
    if (!oldNews) {
      throw new Error('Image news not found');
    }

    // Xoá ảnh trên Cloudinary khi news bị xoá
    if (oldNews.image) {
      await this.cloudinaryService.deleteImage(oldNews.image);
    }
    await this.NewsRepository.remove(id);
  }
}
