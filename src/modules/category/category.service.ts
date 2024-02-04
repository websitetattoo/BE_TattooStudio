import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findAll() {
    return await this.categoryRepository.findAll();
  }

  async createCategory(data: any) {
    return await this.categoryRepository.create(data);
  }
}
