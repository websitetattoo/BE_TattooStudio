import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/entities/category.entity';
import { CategoryRepository } from 'src/repositories/category.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
  ],
  providers: [CategoryRepository],
})
export default class CategoryModule {}
