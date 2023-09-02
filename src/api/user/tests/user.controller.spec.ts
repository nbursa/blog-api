import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { ConflictException } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;
  let mockUserService: { findOne: jest.Mock; create: jest.Mock };

  beforeEach(async () => {
    mockUserService = {
      findOne: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should throw ConflictException if user already exists', async () => {
      mockUserService.findOne.mockResolvedValue({
        id: 1,
        email: 'email@example.com',
      });

      await expect(
        controller.create({ body: { email: 'email@example.com' } }),
      ).rejects.toThrow(ConflictException);
    });

    it('should create a new user if user does not exist', async () => {
      mockUserService.findOne.mockResolvedValue(null);
      mockUserService.create.mockResolvedValue({
        id: 1,
        email: 'email@example.com',
      });

      const result = await controller.create({
        body: { email: 'email@example.com' },
      });

      expect(result).toEqual({ id: 1, email: 'email@example.com' });
    });
  });
});
