import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { PricingPackagesService } from '../pricingPackages/pricingPackages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PricingPackage } from '../entities/pricingPackage.schema';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { Subscription } from '../entities/subscription.schema';
import { User } from '../entities/user.schema';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { Application } from '../entities/application.schema';
import { ApplicationsService } from '../applications/applications.service';
@Module({
  controllers: [StorageController],
  providers: [
    ApplicationsService,
    StorageService,
    PricingPackagesService,
    SubscriptionsService,
  ],
  exports: [StorageService],
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: multer.memoryStorage(),
        limits: {
          fileSize: 500 * 1024 * 1024, // 5MB file size limit (adjust as needed)
        },
      }),
    }),
    TypeOrmModule.forFeature([PricingPackage]),
    TypeOrmModule.forFeature([Subscription]),
    TypeOrmModule.forFeature([Application]),
    TypeOrmModule.forFeature([User]),
  ],
})
export class StoragedModule {}
