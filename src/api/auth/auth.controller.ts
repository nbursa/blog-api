import {
  Controller,
  Post,
  Logger,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from '../../schema/user.schema';

@Controller('auth')
export class AuthController {
  logger: Logger;
  constructor(private readonly authService: AuthService) {
    this.logger = new Logger(AuthController.name);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @Request() req: { user: User },
  ): Promise<{ access_token: string; user: User }> {
    try {
      const accessToken = await this.authService.generateJwtToken(req.user);
      return { access_token: accessToken, user: req.user };
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getUser(@Request() req: { user: User }): Promise<User> {
    return req.user;
  }
}
