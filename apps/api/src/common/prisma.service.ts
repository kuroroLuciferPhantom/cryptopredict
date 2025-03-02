import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    // Connect to the database when the module is initialized
    await this.$connect();
  }

  async onModuleDestroy() {
    // Disconnect from the database when the module is destroyed
    await this.$disconnect();
  }

  async cleanDatabase() {
    return this.$transaction(async (prisma) => {
      // Add cleanup logic if needed for testing or development
      // E.g., prisma.user.deleteMany(), etc.
    });
  }
}