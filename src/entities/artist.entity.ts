import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Artist extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  header: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  avatar: string;

  @Prop()
  images: string[];

  @Prop()
  link: string;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
