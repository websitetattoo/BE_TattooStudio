import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Employee extends Document {
  @Prop({ required: true, unique: true, message: 'ID must be unique' })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  avatar: string;

  @Prop({ required: true })
  images: string[];

  @Prop({ required: true })
  link: string;

  @Prop({ required: true })
  style: string;

  @Prop({ required: true })
  content: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
