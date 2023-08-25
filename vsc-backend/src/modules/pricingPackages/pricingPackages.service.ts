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
import { EditPricingPackageDto } from './dto/editPricingPackage.dto';
import { DeletePricingPackageDto } from './dto/deletePricingPackage.dto';

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

  async edit(
    editPricingPackageDto: EditPricingPackageDto,
  ): Promise<PricingPackage> {
    try {
      await this.pricingPackageModel.update(
        {
          id: editPricingPackageDto.id,
        },
        editPricingPackageDto,
      );
      return await this.pricingPackageModel.findOne({
        where: { id: editPricingPackageDto.id },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async delete(
    deletePricingPackageDto: DeletePricingPackageDto,
  ): Promise<PricingPackage> {
    try {
      await this.pricingPackageModel.update(
        {
          id: deletePricingPackageDto.id,
        },
        { active: false },
      );
      return await this.pricingPackageModel.findOne({
        where: { id: deletePricingPackageDto.id },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async activate(
    deletePricingPackageDto: DeletePricingPackageDto,
  ): Promise<PricingPackage> {
    try {
      await this.pricingPackageModel.update(
        {
          id: deletePricingPackageDto.id,
        },
        { active: true },
      );
      return await this.pricingPackageModel.findOne({
        where: { id: deletePricingPackageDto.id },
      });
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

  /**
   * Get active Pricing Package.
   *
   * @returns {PricingPackage[]}
   */
  async findActive(): Promise<PricingPackage[]> {
    return this.pricingPackageModel.find({
      where: { active: true },
      order: { packageName: 'ASC' },
    });
  }
}
