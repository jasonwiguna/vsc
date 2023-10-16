import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInputDto, LoginOutputDto } from '../users/dto/login.dto';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ErrorResponse } from '../dto/responses.dto';

@Controller()
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @ApiExtraModels(LoginOutputDto)
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 201,
    schema: {
      $ref: getSchemaPath(LoginOutputDto),
    },
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized',
    type: () => ErrorResponse,
  })
  @Post('auth/login')
  async login(@Body() user: LoginInputDto) {
    const token = await this.authService.login(user.email, user.password);
    if (token.success) {
      return token.message;
    } else {
      throw token.error;
    }
  }
}
