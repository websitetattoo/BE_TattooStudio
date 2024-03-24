import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Images extends Document {
  @Prop({ required: true, unique: true, message: 'ID must be unique' })
  id: number;

  @Prop({ required: true })
  Images: string[];
}

export const ImagesSchema = SchemaFactory.createForClass(Images);
