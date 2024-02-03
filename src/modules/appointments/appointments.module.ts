import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Appointments,
  AppointmentsSchema,
} from 'src/entities/appointments.entity';
import { AppointmentsRepository } from 'src/repositories/appointments.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Appointments.name,
        schema: AppointmentsSchema,
      },
    ]),
  ],
  providers: [AppointmentsRepository],
})
export default class AppointmentsModule {}
