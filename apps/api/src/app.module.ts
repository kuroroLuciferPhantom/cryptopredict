import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CardModule } from './modules/card/card.module';
import { CryptoModule } from './modules/crypto/crypto.module';
import { PredictionModule } from './modules/prediction/prediction.module';
import { MarketplaceModule } from './modules/marketplace/marketplace.module';
import { LeagueModule } from './modules/league/league.module';
import { PrismaService } from './common/prisma.service';
import { TrpcModule } from './trpc/trpc.module';

@Module({
  imports: [
    // Environment configuration
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    // Queue for async tasks
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST', 'localhost'),
          port: configService.get('REDIS_PORT', 6379),
        },
      }),
      inject: [ConfigService],
    }),
    
    // Scheduled tasks
    ScheduleModule.forRoot(),
    
    // Application modules
    UserModule,
    AuthModule,
    CardModule,
    CryptoModule,
    PredictionModule,
    MarketplaceModule,
    LeagueModule,
    TrpcModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
