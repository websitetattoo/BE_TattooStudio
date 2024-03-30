import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  tel: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  instagram: string;

  @Prop({ required: true })
  facebook: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
