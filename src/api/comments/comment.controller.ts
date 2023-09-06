import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from '../../schema/comment.schema';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create')
  async create(@Body() data: any): Promise<Comment> {
    console.log('controller data:', data)
    return this.commentService.create(data);
  }

  @Get('post/:postId')  // Changed this
  async findByPostId(@Param('postId') postId: string): Promise<Comment[]> {  // And this
    return this.commentService.findByPostId(postId);  // Update this method accordingly
  }

  @Put('edit/:id')
  async edit(@Param('id') id: string, @Body() data: any): Promise<Comment> {
    return this.commentService.edit(id, data);
  }

  @Put(':commentId/replies')
  async addReply(@Param('commentId') commentId: string, @Body() data: any): Promise<Comment> {
    return this.commentService.addReply(commentId, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Comment> {
    return this.commentService.delete(id);
  }
}
