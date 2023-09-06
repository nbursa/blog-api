import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema, Reply, ReplySchema } from '../../schema/comment.schema';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Reply.name, schema: ReplySchema }])
  ],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
