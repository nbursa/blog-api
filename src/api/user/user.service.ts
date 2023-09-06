import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from '../../schema/user.schema';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  logger: Logger;
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {
    this.logger = new Logger(UserService.name);
  }

  async findOne(query: any): Promise<any> {
    return this.userModel.findOne(query).select('+password');
  }

  async find(usersFilterQuery: FilterQuery<User>): Promise<User[]> {
    return this.userModel.find(usersFilterQuery);
  }

  // async findAll(): Promise<User[]> {
  //   return this.userModel.find();
  // }
  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async create(user: User): Promise<{ user: User; token: string }> {
    user.password = await this.authService.getHashedPassword(user.password);
    const newUser = new this.userModel(user);
    const savedUser = await newUser.save();

    const token = await this.authService.generateJwtToken(savedUser);

    return {
      user: savedUser.toObject(),
      token,
    };
  }

  async findOneAndUpdate(query: any, payload: any): Promise<User> {
    this.logger.log('Updating User.');
    return this.userModel.findOneAndUpdate(query, payload, {
      new: true,
      upsert: true,
    });
  }

  async findOneAndRemove(query: any): Promise<any> {
    return this.userModel.findOneAndRemove(query);
  }
}
