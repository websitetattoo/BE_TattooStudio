import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Tattoocare extends Document {
  @Prop()
  title: string[];

  @Prop()
  content: string;
}

export const tattoocareSchema = SchemaFactory.createForClass(Tattoocare);
