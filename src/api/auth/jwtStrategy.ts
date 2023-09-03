import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { config } from 'dotenv';
config();

interface JwtPayload {
  email: string;
}

const jwtSecret = process.env.JWT_SECRET as string;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  logger: Logger;

  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
    this.logger = new Logger(JwtStrategy.name);
  }

  async validate(payload: JwtPayload) {
    this.logger.log('Validate passport:', payload);
    const user = await this.userService.findOne({ email: payload.email });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
