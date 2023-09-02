import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { LocalAuthGuard } from '../local-auth.guard';

describe('AuthController', () => {
  let controller: AuthController;
  const mockAuthService = {
    generateJwtToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        JwtAuthGuard,
        LocalAuthGuard,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return a JWT token when valid credentials are provided', async () => {
      mockAuthService.generateJwtToken.mockReturnValue({
        access_token: 'test_token',
      });
      const req = { user: { email: 'test@example.com', password: '123456' } };

      const result = await controller.login(req);

      expect(result).toEqual({ access_token: 'test_token' });
    });

    it('should throw an error when generateJwtToken throws an error', async () => {
      mockAuthService.generateJwtToken.mockImplementation(() => {
        throw new Error('Test Error');
      });

      const req = { user: { email: 'test@example.com', password: '123456' } };

      await expect(controller.login(req)).rejects.toThrow('Test Error');
    });
  });

  describe('getUser', () => {
    it('should return the user object from request', async () => {
      const req = { user: { email: 'test@example.com', id: 1 } };

      const result = await controller.getUser(req);

      expect(result).toEqual(req.user);
    });
  });
});
