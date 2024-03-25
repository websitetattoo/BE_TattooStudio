import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Faq extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;
}

export const FaqSchema = SchemaFactory.createForClass(Faq);
