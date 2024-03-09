//////////////////// Module
import { MongooseModule } from '@nestjs/mongoose';
import CategoryModule from './modules/category/category.module';
import AppointmentsModule from './modules/appointments/appointments.module';
import UserModule from './modules/user/user.module';
import ImagesModule from './modules/images/images.module';
import EmployeeModule from './modules/employee/employee.module';
import DiscountModule from './modules/discount/discount.module';
import PoliciesModule from './modules/policies/policies.module';
import { ConfigModule } from './config/config.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
////////////////////////////////////

import { ConfigService } from './config/config.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule,
    // MongoDB Connection
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.getMongoConfig(),
    }),
    CategoryModule,
    AppointmentsModule,
    UserModule,
    ImagesModule,
    EmployeeModule,
    DiscountModule,
    CloudinaryModule,
    PoliciesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
