import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  fileName: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  create_by: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
