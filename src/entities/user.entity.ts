import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  description: string;

  @Prop()
  rfImage: string;

  @Prop()
  addImage: string;

  @Prop()
  lcImage: string;

  @Prop()
  location: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
