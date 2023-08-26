import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BlogPost } from './schema/blog-post.schema';
import { BlogService } from './blog.service';

@Controller('api/blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async getAllPosts(): Promise<BlogPost[]> {
    return this.blogService.getAllPosts();
  }

  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<BlogPost> {
    return this.blogService.getPostById(id);
  }

  @Post()
  async createPost(
    @Body('title') title: string,
    @Body('content') content: string,
  ): Promise<BlogPost> {
    return this.blogService.createPost(title, content);
  }

  @Put(':id')
  async updatePost(
    @Param('id') id: number,
    @Body('title') title: string,
    @Body('content') content: string,
  ): Promise<BlogPost> {
    return this.blogService.updatePost(id, title, content);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: number): Promise<string> {
    return this.blogService.deletePost(id);
  }
}
