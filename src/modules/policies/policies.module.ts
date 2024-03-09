import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Policies, PoliciesSchema } from 'src/entities/policies.entity';
import { PoliciesRepository } from 'src/repositories/policies.repository';
import { PoliciesService } from './policies.service';
import { PoliciesController } from './policies.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Policies.name,
        schema: PoliciesSchema,
      },
    ]),
  ],
  controllers: [PoliciesController],
  providers: [PoliciesRepository, PoliciesService],
  exports: [PoliciesService, PoliciesRepository],
})
export default class PoliciesModule {}
