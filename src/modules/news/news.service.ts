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
    private newsRepository: NewsRepository,
    private cloudinaryService: CloudinaryService,
  ) {}

  async findAll(): Promise<News[]> {
    return this.newsRepository.findAll();
  }

  async create(data: any, file: any): Promise<News> {
    try {
      if (!file) {
        // Handle the case where file are undefined
        throw new Error('No file were provided');
      }

      const uploadImage = file.map((file: any) => {
        return this.cloudinaryService.uploadImage(file);
      });
      const uploadResult = await Promise.all(uploadImage);

      const newNews: News = {
        ...data,
        image: uploadResult[0]?.secure_url,
      };
      const createNews = await this.newsRepository.create(newNews);

      return createNews;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<News> {
    const news = await this.newsRepository.findById(id);
    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found.`);
    }
    return news;
  }

  async update(id: string, data: any, file: any): Promise<News> {
    try {
      if (file) {
        // Trong trường hợp người dùng muốn đổi ảnh mới khi cập nhật
        // Truy vấn News cũ để lấy đường dẫn ảnh cũ từ db
        const oldNews = await this.newsRepository.findById(id);
        if (!oldNews) {
          throw new Error('Image news not found');
        }
        // Xoá ảnh cũ trên Cloudinary
        if (oldNews.image) {
          await this.cloudinaryService.deleteImage(oldNews.image);
        }

        const uploadImage = file.map((file: any) => {
          return this.cloudinaryService.uploadImage(file);
        });
        const uploadResult = await Promise.all(uploadImage);

        const newData: News = {
          ...data,
          image: uploadResult[0]?.secure_url,
        };

        return await this.newsRepository.update(id, newData);
      } else {
        // Trường hợp người dùng chỉ đổi dữ liệu không đổi ảnh mới.
        const newData: News = {
          ...data,
        };
        return await this.newsRepository.update(id, newData);
      }
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    const oldNews = await this.newsRepository.findById(id);
    if (!oldNews) {
      throw new Error('Image news not found');
    }

    // Xoá ảnh trên Cloudinary khi news bị xoá
    if (oldNews.image) {
      await this.cloudinaryService.deleteImage(oldNews.image);
    }
    await this.newsRepository.remove(id);
  }
}
