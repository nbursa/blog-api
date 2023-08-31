import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './LocalAuthGuard';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwtStrategy';
import * as dotenv from 'dotenv';
dotenv.config();

const jwtSecret = process.env.JWT_SECRET || '';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '86400s', algorithm: 'HS256' },
    }),
    forwardRef(() => UserModule),
    PassportModule,
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
