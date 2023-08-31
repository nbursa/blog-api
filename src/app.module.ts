import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './api/blog/blog.module';
import * as dotenv from 'dotenv';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
dotenv.config();

const mongodb = process.env.MONGODB_URI || '';

@Module({
  imports: [
    MongooseModule.forRoot(mongodb),
    BlogModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
