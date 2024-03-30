//Libary
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//Entities
import { Booking, BookingSchema } from 'src/entities/booking.entity';
import { User, UserSchema } from 'src/entities/user.entity';
//./
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
//Repositories
import { BookingRepository } from 'src/repositories/Booking.repository';
import { UserRepository } from 'src/repositories/User.repository';
//Cloudinary
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
//Email
import { EmailService } from 'src/email/email.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Booking.name,
        schema: BookingSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [BookingController],
  providers: [
    BookingService,
    BookingRepository,
    CloudinaryService,
    UserService,
    UserRepository,
    EmailService,
  ],
  exports: [BookingService, BookingRepository],
})
export default class BookingModule {}
