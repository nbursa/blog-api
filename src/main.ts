import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mongoose from 'mongoose';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

// const corsConfig: CorsOptions = {
//   origin: 'http://localhost:5173',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
// };

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // app.enableCors(corsConfig);
  mongoose.connection.on('connected', () => {
    console.log(
      `Mongoose has connected to ${mongoose.connection.host}:${mongoose.connection.port}`,
    );
  });

  await app.listen(3000, () => {
    console.log('Application is running on: http://localhost:3000');
  });
}

bootstrap();
