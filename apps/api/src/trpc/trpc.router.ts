import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { TrpcService } from './trpc.service';

@Injectable()
export class TrpcRouter {
  constructor(private readonly trpcService: TrpcService) {
    // Create the application router once this service is instantiated
    this.createAppRouter();
  }

  // Create the main application router with all the sub-routers
  // This will be expanded as we add more modules
  private createAppRouter() {
    // Create a health check router
    const healthRouter = this.trpcService.router({
      ping: this.trpcService.procedure.query(() => {
        return {
          status: 'ok',
          timestamp: new Date().toISOString(),
        };
      }),
    });

    // Root router that merges all sub-routers
    this.trpcService.appRouter = this.trpcService.router({
      health: healthRouter,
    });
  }
}

// Export type definition of the API
export type AppRouter = TrpcRouter['trpcService']['appRouter'];
