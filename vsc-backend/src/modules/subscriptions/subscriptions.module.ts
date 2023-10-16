import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { Subscription } from '../entities/subscription.schema';
import { UsersService } from '../users/users.service';
import { User } from '../entities/user.schema';
import { PricingPackage } from '../entities/pricingPackage.schema';
import { PricingPackagesService } from '../pricingPackages/pricingPackages.service';
@Module({
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, UsersService, PricingPackagesService],
  exports: [SubscriptionsService],
  imports: [
    TypeOrmModule.forFeature([Subscription]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([PricingPackage]),
  ],
})
export class SubscriptionsModule {}
