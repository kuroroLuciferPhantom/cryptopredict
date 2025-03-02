import { Injectable } from '@nestjs/common';
import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';

export type TrpcContext = Awaited<ReturnType<typeof createTrpcContext>>;

export const createTrpcContext = ({ req, res }: CreateExpressContextOptions) => {
  return { req, res };
};

@Injectable()
export class TrpcService {
  trpc = initTRPC.context<TrpcContext>().create();
  procedure = this.trpc.procedure;
  router = this.trpc.router;
  mergeRouters = this.trpc.mergeRouters;

  createExpressMiddleware = () => {
    return trpcExpress.createExpressMiddleware({
      router: this.appRouter,
      createContext: createTrpcContext,
    });
  };

  // Will be set by the AppRouter
  appRouter: ReturnType<typeof this.router> = null;
}
