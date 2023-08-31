import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // app.enableCors({
  //   origin: 'http://localhost:5173',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   credentials: true,
  // });
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
