import {
  Body,
  ConflictException,
  Controller, Get,
  Logger,
  Post,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../schema/user.schema';

@Controller('user')
export class UserController {
  logger: Logger;
  constructor(private readonly userService: UserService) {
    this.logger = new Logger(UserController.name);
  }

  @Post('create')
  async create(@Body() newUser: User): Promise<{
    user: User;
    token: string
  }> {
    try {
      const query = { email: newUser.email };
      const existingUser = await this.userService.findOne(query);
      if (existingUser) {
        throw new ConflictException('User Already Exists');
      } else {
        return await this.userService.create(newUser);
      }
    } catch (error) {
      this.logger.error('Something went wrong in signup:', error);
      throw error;
    }
  }

  @Get('all')
  async getAllUsers(): Promise<User[]> {
    try {
      return await this.userService.findAll();
    } catch (error) {
      this.logger.error('Something went wrong:', error);
      throw error;
    }
  }

  // @Post('create')
  // async create(@Request() req): Promise<User> {
  //   const newUser = req.body;
  //   try {
  //     const query = { email: newUser.email };
  //     const isUser = await this.userService.findOne(query);
  //     if (isUser) {
  //       throw new ConflictException('User Already Exist');
  //     } else {
  //       return await this.userService.create(newUser);
  //     }
  //   } catch (err) {
  //     this.logger.error('Something went wrong in signup:', err);
  //     throw err;
  //   }
  // }
}
