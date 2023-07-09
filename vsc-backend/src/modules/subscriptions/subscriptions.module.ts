import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { Subscription } from '../entities/subscription.schema';
import { UsersService } from '../users/users.service';
import { User } from '../entities/user.schema';
@Module({
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, UsersService],
  exports: [SubscriptionsService],
  imports: [
    TypeOrmModule.forFeature([Subscription]),
    TypeOrmModule.forFeature([User]),
  ],
})
export class SubscriptionsModule {}
