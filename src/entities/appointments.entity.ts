import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Appointments extends Document {
  @Prop({ required: true, unique: true, message: 'ID must be unique' })
  id: number;

  @Prop({ required: true })
  userID: number;

  @Prop({ required: true })
  employeeID: number[];

  @Prop({ required: true })
  dateBooking: Date;

  @Prop({ required: true })
  comment: string;

  @Prop({ required: true })
  code: string;
}

export const AppointmentsSchema = SchemaFactory.createForClass(Appointments);
