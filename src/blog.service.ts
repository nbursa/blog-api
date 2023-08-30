import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { BlogPost, BlogPostDocument } from './schema/blog-post.schema';

@Injectable()
export class BlogService implements OnModuleInit {
  constructor(
    @InjectModel(BlogPost.name)
    private readonly blogModel: Model<BlogPostDocument>,
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  async onModuleInit() {
    console.log(
      'Mongoose has connected to ' +
        this.connection.collections['blogposts'].name,
    );
  }

  async getAllPosts(): Promise<BlogPost[]> {
    return this.blogModel.find().exec();
  }

  async getPostById(id: string): Promise<BlogPost> {
    const post = await this.blogModel.findById(id).exec();
    if (!post) {
      throw new Error('Post not found');
    }
    return post;
  }

  async createPost(title: string, content: string): Promise<BlogPost> {
    const newPost = new this.blogModel({ title, content });
    return newPost.save();
  }

  async updatePost(
    id: string,
    title: string,
    content: string,
  ): Promise<BlogPost> {
    const post = await this.blogModel.findById(id).exec();
    if (!post) {
      throw new Error('Post not found');
    }

    if (title) post.title = title;
    if (content) post.content = content;
    post.updatedAt = new Date();

    return post.save();
  }

  async deletePost(id: string): Promise<string> {
    const post = await this.blogModel.findById(id).exec();
    if (!post) {
      throw new Error('Post not found');
    }

    await this.blogModel.deleteOne({ _id: id });
    return 'Blog post deleted successfully';
  }
}
