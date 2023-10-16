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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApplicationsService } from './applications.service';
import { Application } from '../entities/application.schema';
import { CreateApplicationDto } from './dto/createApplication.dto';
import { EditApplicationDto } from './dto/editApplication.dto';

@Controller()
@ApiTags('Applications')
export class ApplicationsController {
  constructor(private applicationService: ApplicationsService) {}

  @ApiOperation({ summary: 'Get All Applications' })
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(Application),
    },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
    type: () => ErrorResponse,
  })
  @Get('/application')
  async getAllApplications() {
    try {
      return await this.applicationService.findAll();
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
  @ApiOperation({ summary: 'Add application' })
  @ApiResponse({
    status: 201,
    description: 'Successful Response',
    schema: {
      $ref: getSchemaPath(Application),
    },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
    type: () => ErrorResponse,
  })
  @Post('/application')
  async addApplication(@Body() request: CreateApplicationDto) {
    try {
      return this.applicationService.create(request);
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
  @ApiOperation({ summary: 'Edit application' })
  @ApiResponse({
    status: 201,
    description: 'Successful Response',
    schema: {
      $ref: getSchemaPath(Application),
    },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
    type: () => ErrorResponse,
  })
  @Put('/application')
  async editApplication(@Body() request: EditApplicationDto) {
    try {
      return this.applicationService.edit(request);
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
