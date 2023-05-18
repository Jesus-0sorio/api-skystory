import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true })
  email: string;
  @Prop({ required: true, unique: true })
  username: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, select: false })
  password: string;
  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Post' }] })
  posts = [];
}

export const UserSchema = SchemaFactory.createForClass(User);
