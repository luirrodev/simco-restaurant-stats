import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { RestaurantStatsModule } from './restaurant-stats/restaurant-stats.module';

import config from './config';
import { enviroments } from './enviroments';
import { SalesOrdersStatsModule } from './sales-orders-stats/sales-orders-stats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      envFilePath: enviroments[process.env.NODE_ENV || 'dev'],
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        GAME_EMAIL: Joi.string().email().required(),
        GAME_PASSWORD: Joi.string().required(),
        TIMEZONE_OFFSET: Joi.number().default(0),
      }),
    }),
    AuthModule,
    DatabaseModule,
    HealthModule,
    RestaurantStatsModule,
    SalesOrdersStatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
