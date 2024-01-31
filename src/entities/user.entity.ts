import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true, message: 'ID must be unique' })
  id: number;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  age: boolean;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  rfImage: string;

  @Prop({ required: true })
  addImage: string;

  @Prop({ required: true })
  location: string;

  @Prop()
  lcImage: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
