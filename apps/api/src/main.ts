import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { TrpcRouter } from './trpc/trpc.router';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { createTrpcContext } from './trpc/trpc.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });
  
  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));

  // Get trpc router instance
  const trpcRouter = app.get(TrpcRouter);
  
  // Setup trpc middleware
  app.use(
    '/trpc',
    createExpressMiddleware({
      router: trpcRouter.trpcService.appRouter,
      createContext: createTrpcContext,
    }),
  );

  // Start the server
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();