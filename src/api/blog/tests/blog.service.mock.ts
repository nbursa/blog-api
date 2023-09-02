import { BlogPost } from '../../../schema/blog-post.schema';
import { blogPosts, MockBlogPost } from './mockData';

export class BlogServiceMock {
  private posts: MockBlogPost[] = [...blogPosts];

  async getAllPosts(): Promise<BlogPost[]> {
    return this.posts;
  }

  async getPostById(id: string): Promise<BlogPost | null> {
    return this.posts.find((post) => post.id === id) || null;
  }

  async createPost(title: string, content: string): Promise<BlogPost> {
    const newPost: BlogPost = {
      id: (this.posts.length + 1).toString(),
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.posts.push(newPost);
    return newPost;
  }

  // Implement other methods as needed for your tests
}
