import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Discount extends Document {
  @Prop({ required: true, unique: true, message: 'ID must be unique' })
  id: number;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  total: number;

  @Prop({ required: true })
  type: number;
}

export const DiscountSchema =
  SchemaFactory.createForClass(Discount);
