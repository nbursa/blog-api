import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blog.module';
import * as dotenv from 'dotenv';
dotenv.config();

const mongodb = process.env.MONGODB_URI || '';

@Module({
  imports: [MongooseModule.forRoot(mongodb), BlogModule],
})
export class AppModule {}
