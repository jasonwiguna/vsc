import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '../entities/user.schema';
import { Subscription } from '../entities/subscription.schema';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
@Module({
  controllers: [UsersController],
  providers: [UsersService, SubscriptionsService],
  exports: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Subscription]),
  ],
})
export class UsersModule {}
