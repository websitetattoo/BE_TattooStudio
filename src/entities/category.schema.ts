import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Category extends Document {

    @Prop({ type: String })
    name: string;

    @Prop({ type: String })
    decription: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);