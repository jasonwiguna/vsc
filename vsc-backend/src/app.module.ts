import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalService } from './global/global.service';
import { UsersModule } from './modules/users/users.module';
import { GlobalModule } from './global/global.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import entities from 'src/modules/entities/index';
import 'dotenv/config';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { PricingPackagesModule } from './modules/pricingPackages/pricingPackages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      database: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT as unknown as number,
      entities,
    }),
    UsersModule,
    SubscriptionsModule,
    PricingPackagesModule,
    GlobalModule,
  ],
  controllers: [AppController],
  providers: [AppService, GlobalService],
})
export class AppModule {}
