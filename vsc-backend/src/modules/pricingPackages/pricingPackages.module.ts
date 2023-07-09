import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PricingPackagesController } from './pricingPackages.controller';
import { PricingPackagesService } from './pricingPackages.service';
import { PricingPackage } from '../entities/pricingPackage.schema';
@Module({
  controllers: [PricingPackagesController],
  providers: [PricingPackagesService],
  exports: [PricingPackagesService],
  imports: [TypeOrmModule.forFeature([PricingPackage])],
})
export class PricingPackagesModule {}
