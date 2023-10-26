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
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ErrorResponse, SuccessfulResponse } from '../dto/responses.dto';
import { UsersService } from '../users/users.service';
import { User } from '../entities/user.schema';
import * as crypto from 'crypto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PricingPackage } from '../entities/pricingPackage.schema';
import { PricingPackagesService } from '../pricingPackages/pricingPackages.service';
import { MailerService } from '@nestjs-modules/mailer';

const adminEmail = process.env.ADMIN_EMAIL;
const senderEmail = process.env.EMAIL;

@Controller()
@ApiTags('Subscriptions')
export class SubscriptionsController {
  constructor(
    private subscriptionsService: SubscriptionsService,
    private usersService: UsersService,
    private pricingPackageService: PricingPackagesService,
    private mailerService: MailerService,
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
      const key = crypto.randomBytes(16).toString('hex').toLocaleLowerCase();
      const subscription = {
        userId: user.id,
        pricingPackageId: request.pricingPackageId,
        paymentPlan: request.paymentPlan,
        key: key,
        subscriptionDate: request.subscriptionDate,
        expirationDate: request.expirationDate,
        // new Date(
        //   new Date().setMonth(new Date().getMonth() + 1),
        // ),
      };
      const result: InstanceType<typeof Subscription> =
        await this.subscriptionsService.create(subscription);

      const pricingPackage: InstanceType<typeof PricingPackage | undefined> =
        await this.pricingPackageService.findOneByPricingPackageId(
          request.pricingPackageId,
        );

      this.mailerService
        .sendMail({
          to: adminEmail,
          from: senderEmail,
          subject: `New User Registration for ${pricingPackage.packageName}`,
          html: `<b>Name: </b>${user.firstname} ${user.lastname}
            <br>
            <b>Company: </b>${user.company}
            <br>
            <b>Email: </b>${user.email}
            <br>
            <b>Phone Number: </b>${user.phone}
            <br>
            <b>Country: </b>${user.country}
            <br>
            <b>Package: </b>${pricingPackage.packageName}
            <br>
            <b>Agree to have updates: </b>${
              user.updatePermission ? 'Yes' : 'No'
            }`,
        })
        .then(() => {
          console.log('Email sent');
        })
        .catch((error) => {
          console.log(error);
        });

      const licenseDetails = `Here are your license details:
        <br>
        <br>
        <b>License Key: </b>${key}
        <br>
        <b>Download Link to Installer: </b>web.vstream.asia/download?p=${pricingPackage.id}&u=${user.id}`;

      this.mailerService
        .sendMail({
          to: user.email,
          from: senderEmail,
          subject: `${
            pricingPackage.packageName == 'Camera Connect Pro (CCP)'
              ? 'Camera Connect Pro Purchase'
              : pricingPackage.packageName == 'Camera Connect Ultra (CCU)'
              ? 'Camera Connect Ultra Purchase'
              : 'License Key for Camera Connect Lite'
          }`,
          html: `Hi ${user.firstname} ${user.lastname},
            <br>
            <br>
            Thank you for your interest in VSTREAM CAMERA CONNECT. This tool is just one part of our broader suite of software solutions, VSTREAM CONNECT. Together, these tools provide a unified platform for achieving efficient workflows, connecting with applications, and addressing complex requirements.
            <br>
            Whether you're in broadcasting, video production, or any industry that demands precise control and efficient workflows, VSTREAM CONNECT is your key to unlocking new possibilities.
            <br>
            <br>
            ${
              pricingPackage.packageName == 'Camera Connect Pro' ||
              pricingPackage.packageName == 'Camera Connect Ultra'
                ? 'Our Support team will be in touch with you with payment details shortly.'
                : licenseDetails
            }`,
        })
        .then(() => {
          console.log('Email sent');
        })
        .catch((error) => {
          console.log(error);
        });

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
