import { MongooseModule } from '@nestjs/mongoose';
import CategoryModule from './modules/category/category.module';
import AppointmentsModule from './modules/appointments/appointments.module';
import UserModule from './modules/user/user.module';
import ImagesModule from './modules/images/images.module';
import EmployeeModule from './modules/employyee/employee.module';
import DiscountModule from './modules/discount/discount.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
