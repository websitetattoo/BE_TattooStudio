import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointments } from 'src/entities/appointments.entity';

@Injectable()
export class AppointmentsRepository {
  constructor(
    @InjectModel(Appointments.name)
    private AppointmentsModel: Model<Appointments>,
  ) {}
}
