//Libaries
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//Entities
import { Tattoocare, tattoocareSchema } from 'src/entities/tattoocare.entity';
//./Tattoo-care
import { TattoocareController } from './tattoo-cate.controller';
import { TattoocareService } from './tattoo-care.service';
//Repositories
import { TattoocareRepository } from 'src/repositories/tattoocare.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Tattoocare.name,
        schema: tattoocareSchema,
      },
    ]),
  ],
  controllers: [TattoocareController],
  providers: [TattoocareRepository, TattoocareService],
  exports: [TattoocareService, TattoocareRepository],
})
export default class TattoocareModule {}
