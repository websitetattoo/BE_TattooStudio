//Libary
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//Category
import { Category } from 'src/entities/category.entity';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}
  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async create(data: any): Promise<Category> {
    const newCategory = new this.categoryModel(data);
    return newCategory.save();
  }
}
