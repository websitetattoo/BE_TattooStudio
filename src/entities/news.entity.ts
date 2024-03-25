import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class News extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, default: Date.now })
  createdDate: Date;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  content: string;
}

export const NewsSchema = SchemaFactory.createForClass(News);
