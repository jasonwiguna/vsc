import {
  Controller,
  Post,
  Body,
  UsePipes,
  BadRequestException,
  UnauthorizedException,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';
import { User } from '../entities/user.schema';
import { CreateUserValidationPipe } from './users.pipe';
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
import { UpdateUserEmailDto } from './dto/updateUser.dto';
import { EnterLicenseKeyDto } from './dto/enterLicenseKey.dto';
import { Subscription } from '../entities/subscription.schema';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { InvalidateHidDto, ValidateHidDto } from './dto/validateHid.dto';

@Controller()
export class UsersController {
  constructor(
    private usersService: UsersService,
    private subscriptionsService: SubscriptionsService,
  ) {}

  @ApiExtraModels(User)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'Successful Response',
    schema: {
      $ref: getSchemaPath(User),
    },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
    type: () => ErrorResponse,
  })
  @Post('/register')
  @UsePipes(new CreateUserValidationPipe())
  async register(@Body() user: CreateUserDto) {
    try {
      const result: InstanceType<typeof User> = await this.usersService.create(
        user,
      );

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

  @ApiOperation({ summary: 'Check email' })
  @ApiResponse({
    status: 201,
    description: 'Successful Response',
    type: () => SuccessfulResponse,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
    type: () => ErrorResponse,
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized',
    type: () => ErrorResponse,
  })
  @Post('/user/check')
  async check(@Body() user: UpdateUserEmailDto) {
    try {
      const result: InstanceType<typeof User> = await this.usersService.findOne(
        user.email,
      );

      if (result) {
        return {
          success: true,
          message: 'Email exist',
          user: {
            id: result.id,
            firstname: result.firstname,
            lastname: result.lastname,
            company: result.company,
            email: result.email,
            phone: result.phone,
            country: result.country,
            updatePermission: result.updatePermission,
            createAt: result.createdAt,
            subscriptions: result.subscriptions,
          },
        };
      } else {
        throw new UnauthorizedException({
          error: {
            success: false,
            message: 'Email does not exist',
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

  @ApiOperation({ summary: 'Enter License Key' })
  @ApiResponse({
    status: 201,
    description: 'Successful Response',
    type: () => SuccessfulResponse,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
    type: () => ErrorResponse,
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized',
    type: () => ErrorResponse,
  })
  @Post('/enterlk')
  async enterlk(@Body() request: EnterLicenseKeyDto) {
    try {
      const result: InstanceType<typeof Subscription> =
        await this.subscriptionsService.findSubscriptionByLicenseKey(request);

      if (result) {
        return {
          success: true,
          response: this.usersService.updateHardwareId(request),
        };
      } else {
        return new UnauthorizedException({
          success: false,
          response: {
            success: false,
            message: 'Invalid email or license key',
          },
        });
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        {
          success: false,
          response: { success: false, message: 'Unknown error' },
        },
        'Bad request',
      );
    }
  }

  @ApiOperation({ summary: 'Validate hardware' })
  @ApiResponse({
    status: 201,
    description: 'Successful Response',
    type: () => SuccessfulResponse,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
    type: () => ErrorResponse,
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized',
    type: () => ErrorResponse,
  })
  @Post('/validateHid')
  async validateHid(@Body() request: ValidateHidDto) {
    try {
      const user: InstanceType<typeof User> =
        await this.usersService.findOneHid(request.hid);

      if (user) {
        const subscription = await this.subscriptionsService.findOneByUserId(
          user.id,
        );
        if (subscription) {
          if (subscription.expirationDate > new Date()) {
            return {
              success: true,
              response: subscription,
            };
          } else {
            return new UnauthorizedException({
              success: false,
              response: {
                success: false,
                message: 'Subscription has expired',
              },
            });
          }
        } else {
          return new UnauthorizedException({
            success: false,
            response: {
              success: false,
              message: 'There is no active subscription',
            },
          });
        }
      } else {
        return new UnauthorizedException({
          success: false,
          response: {
            success: false,
            message: 'Invalid hardware ID',
          },
        });
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        {
          success: false,
          response: { success: false, message: 'Unknown error' },
        },
        'Bad request',
      );
    }
  }

  @ApiOperation({ summary: 'Invalidate hardware ID' })
  @ApiResponse({
    status: 201,
    description: 'Successful Response',
    type: () => SuccessfulResponse,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
    type: () => ErrorResponse,
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized',
    type: () => ErrorResponse,
  })
  @Post('/subscriptions')
  async invalidateHid(@Body() request: InvalidateHidDto) {
    try {
      const user: InstanceType<typeof User> =
        await this.usersService.findOneById(request.id);

      if (user) {
        return {
          success: true,
          response: this.usersService.invalidateHardwareId(request),
        };
      } else {
        return new UnauthorizedException({
          success: false,
          response: {
            success: false,
            message: 'Invalid user ID',
          },
        });
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        {
          success: false,
          response: { success: false, message: 'Unknown error' },
        },
        'Bad request',
      );
    }
  }
}
