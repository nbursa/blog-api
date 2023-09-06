import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Comment,
  Reply,
} from '../../schema/comment.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @InjectModel(Reply.name) private replyModel: Model<Reply>,
  ) {}

  async create(data: any): Promise<Comment> {
    console.log('create comment: ', data)
    const newComment = new this.commentModel(data);
    return await newComment.save();
  }

  async findByPostId(postId: string): Promise<Comment[]> {
    return await this.commentModel.find({ postId });
  }

  async edit(id: string, data: any): Promise<Comment> {
    return await this.commentModel.findByIdAndUpdate(id, data, { new: true });
  }

  async addReply(commentId: string, data: { userId: string, reply: string, userName: string }): Promise<Comment> {
    const comment = await this.commentModel.findById(commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    const { userId, reply, userName } = data;
    const newReply = new this.replyModel({ userId, reply, commentId, userName });
    return this.commentModel.findByIdAndUpdate(commentId, { $push: { replies: newReply } }, { new: true });
  }

  async delete(id: string): Promise<Comment> {
    const comment = await this.commentModel.findById(id);
    await this.commentModel.findByIdAndDelete(id);
    return comment;
  }
}
