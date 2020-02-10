// Loads .env file into process.env
import * as dotenv from 'dotenv';
dotenv.config();

import * as helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AllExceptionFilter } from './core/filters/exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { LoggerInterceptor } from './core/interceptors/logger.interceptor';
import { AuthGuard } from './core/guards/auth.guard';
import { config } from './config';
import { LoggerService } from './core/services/logger.service';

const logger: LoggerService = LoggerService.createLogger('BootstrapApp');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalGuards(new AuthGuard());
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.useGlobalPipes(new ValidationPipe(config.validation));
  app.useGlobalFilters(new AllExceptionFilter());

  // Apply helmet middleware
  app.use(helmet());

  await app.listenAsync(config.port);
  logger.log(`Server listen on http://localhost:${config.port}`);
}

bootstrap();
