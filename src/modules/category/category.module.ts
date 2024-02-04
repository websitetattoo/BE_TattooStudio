import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/entities/category.entity';
import { CategoryRepository } from 'src/repositories/category.repository';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryRepository, CategoryService],
  exports: [CategoryService, CategoryRepository],
})
export default class CategoryModule {}
