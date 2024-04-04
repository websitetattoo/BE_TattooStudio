import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Policies extends Document {
  @Prop()
  subtitle?: string;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  isSubTitle?: boolean;

  @Prop()
  isImportant?: boolean;
}

export const PoliciesSchema = SchemaFactory.createForClass(Policies);
