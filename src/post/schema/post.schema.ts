import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({ unique: true })
  id: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  fileName: string;

  @Prop({ required: true })
  create_by: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
