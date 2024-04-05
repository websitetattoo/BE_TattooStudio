//Libary
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as multer from 'multer';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  // Add CORS middleware
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.PATH_URL_FE);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization',
    );
    next();
  });
  // Configure multer middleware for handling form-data
  const storage = multer.memoryStorage();
  const multerMiddleware = multer({ storage });
  app.use(multerMiddleware.any());

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT);
}

bootstrap();
