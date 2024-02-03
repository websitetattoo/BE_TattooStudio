import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}
}
