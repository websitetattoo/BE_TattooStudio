//Libaries
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//Entities
import { Faq, FaqSchema } from 'src/entities/Faq.entity';
//./Faq
import { FaqController } from './faq.controller';
import { FaqService } from './Faq.service';
//Repositories
import { FaqRepository } from 'src/repositories/faq.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Faq.name,
        schema: FaqSchema,
      },
    ]),
  ],
  controllers: [FaqController],
  providers: [FaqRepository, FaqService],
  exports: [FaqService, FaqRepository],
})
export default class FaqModule {}
