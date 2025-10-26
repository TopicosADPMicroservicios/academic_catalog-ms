import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/rpc-exception.filter';

async function bootstrap() {
  const logger = new Logger('Main');

  // Create hybrid application (HTTP + TCP microservice)
  const app = await NestFactory.create(AppModule);

  // Add TCP microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3001,
    },
  });

  app.useGlobalFilters(new AllExceptionsFilter());

  // Start microservice
  await app.startAllMicroservices();

  // Start HTTP server for health checks on different port
  const httpPort = process.env.HTTP_PORT || 4001;
  await app.listen(httpPort);

  logger.log(`Academic Catalog Microservice TCP running on port 3001`);
  logger.log(`Academic Catalog HTTP health checks on port ${httpPort}`);
}
bootstrap();
