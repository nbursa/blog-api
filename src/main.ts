import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
