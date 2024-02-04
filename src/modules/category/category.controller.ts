import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { CategoryService } from './category.service';
import { Category } from 'src/entities/category.entity';
import { Connection } from 'mongoose';

@Controller('categories')
export class CategoryController {
  constructor(
    @InjectConnection() private readonly mongoConnection: Connection,
    private categoryService: CategoryService,
  ) {}

  // Lấy ra tất cả các danh sách danh mục có trong đb
  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }
  // Tạo các dữ liêu danh mục vào đb
  @Post('/createCategory')
  async createCategory(@Body() data: Category): Promise<any> {
    return this.categoryService.createCategory(data);
  }
}
