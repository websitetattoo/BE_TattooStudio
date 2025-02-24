//Libary
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
//Modules
import CategoryModule from './modules/category/category.module';
import UserModule from './modules/user/user.module';
import ImagesModule from './modules/image/images.module';
import PoliciesModule from './modules/policies/policies.module';
import TattoocareModule from './modules/tattoo-care/tattoo-care.module';
import ArtistModule from './modules/artist/artist.module';
import NewsModule from './modules/news/news.module';
import FaqModule from './modules/faq/faq.module';
import { EmailModule } from './email/email.module';
import BookingModule from './modules/booking/booking.module';
//Config
import { ConfigModule } from './config/config.module';
import { yarConfigService } from './config/config.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule,
    // MongoDB Connection
    MongooseModule.forRootAsync({
      inject: [yarConfigService],
      useFactory: async (configService: yarConfigService) =>
        configService.getMongoConfig(),
    }),
    CategoryModule,
    UserModule,
    ImagesModule,
    ArtistModule,
    CloudinaryModule,
    PoliciesModule,
    TattoocareModule,
    NewsModule,
    FaqModule,
    EmailModule,
    BookingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
