import { Test, TestingModule } from '@nestjs/testing';
import { BlogController } from '../blog.controller';
import { BlogService } from '../blog.service';

describe('BlogController', () => {
  let controller: BlogController;
  let mockBlogService: {
    getAllPosts: jest.Mock;
    getPostById: jest.Mock;
    createPost: jest.Mock;
    updatePost: jest.Mock;
    deletePost: jest.Mock;
  };

  beforeEach(async () => {
    mockBlogService = {
      getAllPosts: jest.fn().mockResolvedValue(['post1', 'post2']),
      getPostById: jest.fn().mockResolvedValue('singlePost'),
      createPost: jest.fn().mockResolvedValue('createdPost'),
      updatePost: jest.fn().mockResolvedValue('updatedPost'),
      deletePost: jest.fn().mockResolvedValue('deletedPostId'),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogController],
      providers: [
        {
          provide: BlogService,
          useValue: mockBlogService,
        },
      ],
    }).compile();

    controller = module.get<BlogController>(BlogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllPosts', () => {
    it('should return all posts', async () => {
      const result = await controller.getAllPosts();
      expect(result).toEqual(['post1', 'post2']);
      expect(mockBlogService.getAllPosts).toHaveBeenCalled();
    });
  });

  describe('getPostById', () => {
    it('should return a single post by id', async () => {
      const result = await controller.getPostById('someId');
      expect(result).toEqual('singlePost');
      expect(mockBlogService.getPostById).toHaveBeenCalledWith('someId');
    });
  });
});
