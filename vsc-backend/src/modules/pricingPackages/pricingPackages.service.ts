import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePricingPackageDto } from './dto/createPricingPackage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PricingPackage } from '../entities/pricingPackage.schema';

@Injectable()
export class PricingPackagesService {
  constructor(
    @InjectRepository(PricingPackage)
    private pricingPackageModel: Repository<PricingPackage>,
  ) {}

  async create(
    createPricingPackageDto: CreatePricingPackageDto,
  ): Promise<PricingPackage> {
    try {
      return await this.pricingPackageModel.save(createPricingPackageDto);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   * Get all Pricing Package.
   *
   * @returns {PricingPackage[]}
   */
  async findAll(): Promise<PricingPackage[]> {
    return this.pricingPackageModel.find({
      order: { packageName: 'ASC' },
    });
  }
}
