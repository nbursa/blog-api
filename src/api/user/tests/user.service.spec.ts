import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { getModelToken } from '@nestjs/mongoose';
import { AuthService } from '../../auth/auth.service';

describe('UserService', () => {
  let service: UserService;
  let mockModel: {
    findOne: jest.Mock<any, any, any>;
    find: jest.Mock<any, any, any>;
    create: jest.Mock<any, any, any>;
    findOneAndUpdate: jest.Mock<any, any, any>;
    findOneAndRemove: jest.Mock<any, any, any>;
  };
  let mockAuthService: { getHashedPassword: jest.Mock<any, any, any> };

  beforeEach(async () => {
    mockModel = {
      findOne: jest.fn(),
      find: jest.fn(),
      create: jest.fn(),
      findOneAndUpdate: jest.fn(),
      findOneAndRemove: jest.fn(),
    };
    mockAuthService = {
      getHashedPassword: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: mockModel,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', async () => {
    const users = [{ username: 'user1' }, { username: 'user2' }];
    // mockModel.find.mockResolvedValue({
    //   exec: jest.fn().mockResolvedValue(users),
    // });
    mockModel.find.mockResolvedValue(users);

    const result = await service.findAll();
    expect(result).toEqual(users);
  });
});
