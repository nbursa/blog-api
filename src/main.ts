import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
dotenv.config();

const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',')
  : [];

const corsConfig: CorsOptions = {
  allowedHeaders: ['Content-Type', 'Authorization'],
  origin: corsOrigins,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsConfig);

  app.setGlobalPrefix('api');

  mongoose.connection.on('connected', () => {
    console.log(
      `Mongoose has connected to ${mongoose.connection.host}:${mongoose.connection.port}`,
    );
  });

  await app.listen(3001, () => {
    console.log(`Application is running on: http://localhost:3001`);
  });
}

bootstrap();
