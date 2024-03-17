import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class News extends Document {
  @Prop()
  Image: File;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  createDate: Date;
}

export const NewsSchema = SchemaFactory.createForClass(News);
