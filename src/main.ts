import helmet from '@fastify/helmet';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from '@/src/infra/prisma/exceptions';
import fmp from '@fastify/multipart';
import cors from '@fastify/cors';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  await app.register(helmet, { contentSecurityPolicy: false, global: true });
  await app.register(cors);
  app.register(fmp);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
