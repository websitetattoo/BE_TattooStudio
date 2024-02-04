import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Employee extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  avatar: string;

  @Prop()
  images: string[];

  @Prop()
  link: string;

  @Prop()
  style: string;

  @Prop()
  content: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
