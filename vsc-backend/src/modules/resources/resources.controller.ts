import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  UseGuards,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ErrorResponse } from '../dto/responses.dto';
import { PricingPackage } from '../entities/pricingPackage.schema';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/createResource.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EditResourceDto } from './dto/editResource.dto';
import { DeleteResourceDto } from './dto/deleteResource.dto';
import { Resource } from '../entities/resource.schema';

@Controller()
@ApiTags('Resource')
export class ResourcesController {
  constructor(private resourceService: ResourcesService) {}

  @ApiOperation({ summary: 'Get All Resources' })
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(Resource),
    },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
    type: () => ErrorResponse,
  })
  @Get('/resource')
  async getAllResources() {
    try {
      return await this.resourceService.findAll();
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
  @ApiOperation({ summary: 'Get All Resources with App Info' })
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(Resource),
    },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
    type: () => ErrorResponse,
  })
  @Get('/resource/all')
  async getAllResourcesWithInfo() {
    try {
      return await this.resourceService.findAllWithInfo();
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
  @ApiOperation({ summary: 'Add resource' })
  @ApiResponse({
    status: 201,
    description: 'Successful Response',
    schema: {
      $ref: getSchemaPath(Resource),
    },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
    type: () => ErrorResponse,
  })
  @Post('/resource')
  async addResource(@Body() request: CreateResourceDto) {
    try {
      return this.resourceService.create(request);
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
  @ApiOperation({ summary: 'Edit resource' })
  @ApiResponse({
    status: 201,
    description: 'Successful Response',
    schema: {
      $ref: getSchemaPath(Resource),
    },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
    type: () => ErrorResponse,
  })
  @Put('/resource')
  async editResource(@Body() request: EditResourceDto) {
    try {
      return this.resourceService.edit(request);
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
  @ApiOperation({ summary: 'Make pricing package inactive' })
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
  @Post('/resource/delete')
  async deleteResource(@Body() request: DeleteResourceDto) {
    try {
      return this.resourceService.delete(request);
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
