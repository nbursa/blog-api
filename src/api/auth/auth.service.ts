import {
  Injectable,
  forwardRef,
  Inject,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const query = { email: email };
    const user = await this.userService.findOne(query);
    if (!user) throw new NotFoundException('Email Does not exist');
    const isMatched = await this.comparePasswords(pass, user.password);
    if (!isMatched) throw new UnauthorizedException('Invalid Password');
    return user;
  }

  async generateJwtToken(user: any): Promise<string> {
    const payload = {
      email: user.email,
    };
    return this.jwtService.sign(payload);
  }

  async getHashedPassword(password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err: Error, hash: unknown) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<any> {
    return bcrypt
      .compare(password, hashedPassword)
      .then((isMatch: boolean) => {
        if (isMatch) return true;
        return false;
      })
      .catch((err: Error) => err);
  }
}
