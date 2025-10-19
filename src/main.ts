import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/rpc-exception.filter';

async function bootstrap() {
  const logger = new Logger('Main');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3001,
      },
    },
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen();

  logger.log('Academic Catalog Microservice is running...');
}
bootstrap();
