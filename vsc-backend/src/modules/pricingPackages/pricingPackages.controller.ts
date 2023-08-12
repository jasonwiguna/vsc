import {
  Controller,
  Post,
  Body,
  UsePipes,
  BadRequestException,
  UnauthorizedException,
  Get,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ErrorResponse, SuccessfulResponse } from '../dto/responses.dto';
import { PricingPackage } from '../entities/pricingPackage.schema';
import { PricingPackagesService } from './pricingPackages.service';
import { CreatePricingPackageDto } from './dto/createPricingPackage.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EditPricingPackageDto } from './dto/editPricingPackage.dto';
import { DeletePricingPackageDto } from './dto/deletePricingPackage.dto';

@Controller()
export class PricingPackagesController {
  constructor(private pricingPackageService: PricingPackagesService) {}

  @ApiOperation({ summary: 'Get Pricing Packages' })
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(PricingPackage),
    },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
    type: () => ErrorResponse,
  })
  @Get('/pricing')
  async getPricingPackages() {
    try {
      return await this.pricingPackageService.findAll();
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        {
          error: { success: false, message: 'Unknown error' },
        },
        'Bad request',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add pricing package' })
  @ApiResponse({
    status: 201,
    description: 'Successful Response',
    schema: {
      $ref: getSchemaPath(PricingPackage),
    },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
    type: () => ErrorResponse,
  })
  @Post('/pricing')
  async addPricingPackage(@Body() request: CreatePricingPackageDto) {
    try {
      return this.pricingPackageService.create(request);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        {
          error: { success: false, message: 'Unknown error' },
        },
        'Bad request',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Edit pricing package' })
  @ApiResponse({
    status: 201,
    description: 'Successful Response',
    schema: {
      $ref: getSchemaPath(PricingPackage),
    },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
    type: () => ErrorResponse,
  })
  @Put('/pricing')
  async editPricingPackage(@Body() request: EditPricingPackageDto) {
    try {
      return this.pricingPackageService.edit(request);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        {
          error: { success: false, message: 'Unknown error' },
        },
        'Bad request',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete pricing package' })
  @ApiResponse({
    status: 201,
    description: 'Successful Response',
    schema: {
      $ref: getSchemaPath(PricingPackage),
    },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
    type: () => ErrorResponse,
  })
  @Delete('/pricing')
  async deletePricingPackage(@Body() request: DeletePricingPackageDto) {
    try {
      return this.pricingPackageService.delete(request);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        {
          error: { success: false, message: 'Unknown error' },
        },
        'Bad request',
      );
    }
  }
}
