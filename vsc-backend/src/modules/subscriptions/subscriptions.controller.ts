import {
  Controller,
  Post,
  Body,
  UsePipes,
  BadRequestException,
  UnauthorizedException,
  Get,
  UseGuards,
} from '@nestjs/common';
import {
  CreateSubscriptionDto,
  CreateSubscriptionRequestDto,
  RenewSubscriptionDto,
} from './dto/createSubscription.dto';
import { SubscriptionsService } from './subscriptions.service';
import { Subscription } from '../entities/subscription.schema';
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
import { UsersService } from '../users/users.service';
import { User } from '../entities/user.schema';
import * as crypto from 'crypto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller()
export class SubscriptionsController {
  constructor(
    private subscriptionsService: SubscriptionsService,
    private usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Subscriptions' })
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(Subscription),
    },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
    type: () => ErrorResponse,
  })
  @Get('/subscriptions/all')
  async getSubscriptions() {
    try {
      return await this.subscriptionsService.findAll();
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
  @ApiOperation({ summary: 'Get Active Subscriptions' })
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(Subscription),
    },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
    type: () => ErrorResponse,
  })
  @Get('/subscriptions/active')
  async getActiveSubscriptions() {
    try {
      return await this.subscriptionsService.findAllActive();
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

  @ApiExtraModels(Subscription)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'Successful Response',
    schema: {
      $ref: getSchemaPath(Subscription),
    },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
    type: () => ErrorResponse,
  })
  @Post('/subscribe')
  async subscribe(@Body() request: CreateSubscriptionRequestDto) {
    try {
      let user: InstanceType<typeof User | undefined> =
        await this.usersService.findOne(request.email);
      if (user) {
        // throw new BadRequestException({
        //   error: {
        //     success: false,
        //     message: 'Email already exist',
        //   },
        // });
      } else {
        user = await this.usersService.create(request);
      }
      const subscription = {
        userId: user.id,
        pricingPackageId: request.pricingPackageId,
        paymentPlan: request.paymentPlan,
        key: crypto.randomBytes(16).toString('hex').toLocaleLowerCase(),
        subscriptionDate: request.subscriptionDate,
        expirationDate: request.expirationDate,
        // new Date(
        //   new Date().setMonth(new Date().getMonth() + 1),
        // ),
      };
      const result: InstanceType<typeof Subscription> =
        await this.subscriptionsService.create(subscription);

      return result;
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
  @ApiOperation({ summary: 'Renew Subscription' })
  @ApiResponse({
    status: 201,
    description: 'Successful Response',
    schema: {
      $ref: getSchemaPath(Subscription),
    },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
    type: () => ErrorResponse,
  })
  @Post('/renew')
  async renew(@Body() request: RenewSubscriptionDto) {
    try {
      const user: InstanceType<typeof User | undefined> =
        await this.usersService.findOneById(request.userId);
      if (user) {
        const subscription = {
          userId: user.id,
          pricingPackageId: request.pricingPackageId,
          key: request.key,
          paymentPlan: request.paymentPlan,
          subscriptionDate: request.subscriptionDate,
          expirationDate: request.expirationDate,
        };
        const result: InstanceType<typeof Subscription> =
          await this.subscriptionsService.create(subscription);

        return result;
      } else {
        throw new BadRequestException({
          error: {
            success: false,
            message: 'User does not exist',
          },
        });
      }
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
