import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { TrpcService } from './trpc.service';

@Injectable()
export class TrpcRouter {
  constructor(public readonly trpcService: TrpcService) {
    this.initialize();
  }

  private initialize() {
    const user = this.trpcService.router({
      getUser: this.trpcService.procedure
        .input(z.string())
        .query(({ input }) => {
          return { id: input, name: 'User ' + input };
        }),
    });

    const health = this.trpcService.router({
      check: this.trpcService.procedure.query(() => {
        return { status: 'ok', timestamp: new Date().toISOString() };
      }),
    });

    this.trpcService.appRouter = this.trpcService.router({
      user,
      health,
    });
  }
}