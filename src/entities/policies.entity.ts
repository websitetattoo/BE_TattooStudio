import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Policies extends Document {
  @Prop()
  headerTitle: string;

  @Prop()
  title: string[];

  @Prop()
  content: string[];
}

export const PoliciesSchema = SchemaFactory.createForClass(Policies);
