import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from '../blog.service';
import { getModelToken } from '@nestjs/mongoose';
// import { BlogPost } from '../../../schema/blog-post.schema';

// TODO: Remove this file  and use the one from the repo

describe('BlogService', () => {
  let service: BlogService;
  let mockModel: {
    find: jest.Mock;
    findById: jest.Mock;
    deleteOne: jest.Mock;
    save: jest.Mock;
    create: jest.Mock;
    constructor: jest.Mock;
  };
  // let service: BlogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogService,
        {
          provide: getModelToken('BlogPost'),
          useValue: {}, // You can provide a mock if needed
        },
      ],
    }).compile();

    service = module.get<BlogService>(BlogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  //
  // beforeEach(async () => {
  //   mockModel = {
  //     find: jest.fn().mockReturnValue({
  //       exec: jest.fn().mockResolvedValue(['post1', 'post2']),
  //     }),
  //     findById: jest.fn().mockReturnValue({
  //       exec: jest.fn().mockResolvedValue('post'),
  //     }),
  //     deleteOne: jest.fn().mockReturnValue({
  //       exec: jest.fn().mockResolvedValue({ deletedCount: 1 }),
  //     }),
  //     save: jest.fn(),
  //     create: jest.fn(),
  //     constructor: jest
  //       .fn()
  //       .mockImplementation((doc) => ({ ...doc, save: jest.fn() })),
  //   };
  //
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [
  //       BlogService,
  //       {
  //         provide: getModelToken('BlogPost'),
  //         useValue: mockModel,
  //       },
  //       {
  //         provide: 'DatabaseConnection',
  //         useValue: {},
  //       },
  //     ],
  //   }).compile();
  //
  //   service = module.get<BlogService>(BlogService);
  // });
  //
  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });

  describe('getAllPosts', () => {
    it('should return all posts', async () => {
      const result = await service.getAllPosts();
      expect(result).toEqual(['post1', 'post2']);
    });
  });

  describe('getPostById', () => {
    it('should return a post by ID', async () => {
      const result = await service.getPostById('someId');
      expect(result).toEqual('post');
    });
  });

  describe('deletePost', () => {
    it('should delete a post', async () => {
      mockModel.deleteOne.mockResolvedValue({ deletedCount: 1 });
      const result = await service.deletePost('someId');
      expect(result).toEqual('Blog post deleted successfully');
      expect(mockModel.deleteOne).toHaveBeenCalledWith({ _id: 'someId' });
    });
  });

  describe('savePost', () => {
    it('should save a post', async () => {
      const newPost = { id: '1', title: 'new title', content: 'new content' };
      mockModel.save.mockResolvedValue(newPost);
      const result = await service.updatePost(
        newPost.id,
        newPost.title,
        newPost.content,
      );
      expect(result).toEqual(newPost);
      expect(mockModel.save).toHaveBeenCalledWith(newPost);
    });
  });

  // describe('createPost', () => {
  //   it('should create a new post', async () => {
  //     const newPost = { title: 'new title', content: 'new content' };
  //     mockModel.create = jest.fn().mockResolvedValue(newPost);
  //
  //     const result = await service.createPost('new title', 'new content');
  //     expect(result).toEqual(newPost);
  //     expect(mockModel.create).toHaveBeenCalledWith({
  //       title: 'new title',
  //       content: 'new content',
  //     });
  //   });
  // });
});
