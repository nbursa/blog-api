import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Reply extends Document {
  @Prop({ required: true, type: Types.ObjectId })
  userId: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  reply: string;

  @Prop({ required: true })
  commentId: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

@Schema()
export class Comment extends Document {
  @Prop({ required: true, type: Types.ObjectId })
  userId: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  postId: string;

  @Prop({ required: true })
  comment: string;

  @Prop([Reply])
  replies: Reply[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
export const ReplySchema = SchemaFactory.createForClass(Reply);
