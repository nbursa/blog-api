import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtServiceMock } from './jwt.service.mock';
import { UserServiceMock } from './user.service.mock';

// TODO: refactor this test to use mocks

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: new JwtServiceMock(), // Use instance of JwtServiceMock
        },
        {
          provide: UserService,
          useValue: new UserServiceMock(), // Use instance of UserServiceMock
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should throw an exception if the user does not exist', async () => {
      const userServiceMock = new UserServiceMock(); // Create instance
      userServiceMock.findOne = jest.fn().mockReturnValue(null); // Mock method

      try {
        await service.validateUser('test@example.com', 'somepassword');
      } catch (e) {
        expect(e.message).toEqual('Email Does not exist');
      }
    });

    it('should throw an exception if the password is invalid', async () => {
      const mockUser = {
        email: 'test@example.com',
        password: 'hashed_password',
      };
      const userServiceMock = new UserServiceMock(); // Create instance
      userServiceMock.findOne = jest.fn().mockReturnValue(mockUser); // Mock method
      userServiceMock.comparePasswords = jest.fn().mockReturnValue(false); // Mock method

      try {
        await service.validateUser('test@example.com', 'invalidpassword');
      } catch (e) {
        expect(e.message).toEqual('Invalid Password');
      }
    });

    it('should return the user if validation passes', async () => {
      const mockUser = {
        email: 'test@example.com',
        password: 'hashed_password',
      };
      const userServiceMock = new UserServiceMock(); // Create instance
      userServiceMock.findOne = jest.fn().mockReturnValue(mockUser); // Mock method
      userServiceMock.comparePasswords = jest.fn().mockReturnValue(true); // Mock method

      const user = await service.validateUser(
        'test@example.com',
        'validpassword',
      );
      expect(user).toEqual(mockUser);
    });
  });

  describe('generateJwtToken', () => {
    it('should generate a JWT token', () => {
      const jwtServiceMock = new JwtServiceMock(); // Create instance
      jwtServiceMock.sign = jest.fn().mockReturnValue('mocked_jwt_token'); // Mock method

      const result = service.generateJwtToken({ email: 'test@example.com' });

      expect(result).toEqual({ access_token: 'mocked_jwt_token' });
    });
  });
});
