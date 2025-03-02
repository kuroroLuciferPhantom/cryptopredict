import { Injectable } from '@nestjs/common';
import { initTRPC } from '@trpc/server';
import { Request, Response } from 'express';

type CreateExpressContextOptions = {
  req: Request;
  res: Response;
};

type TrpcContext = { req: Request; res: Response };

export const createTrpcContext = (opts: CreateExpressContextOptions): TrpcContext => {
  return { req: opts.req, res: opts.res };
};

@Injectable()
export class TrpcService {
  trpc = initTRPC.context<TrpcContext>().create();
  procedure = this.trpc.procedure;
  router = this.trpc.router;
  middleware = this.trpc.middleware;
  mergeRouters = this.trpc.mergeRouters;
  appRouter: any;
}