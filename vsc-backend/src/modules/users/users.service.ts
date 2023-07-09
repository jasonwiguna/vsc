import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/modules/entities/user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnterLicenseKeyDto } from './dto/enterLicenseKey.dto';
import { InvalidateHidDto } from './dto/validateHid.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userModel: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userModel.save(createUserDto);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateHardwareId(request: EnterLicenseKeyDto): Promise<User> {
    try {
      await this.userModel.update(
        { email: request.email },
        { hid: request.hid, updatedAt: new Date() },
      );
      return await this.findOne(request.email);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async invalidateHardwareId(request: InvalidateHidDto): Promise<User> {
    try {
      await this.userModel.update(
        { id: request.id },
        { hid: null, updatedAt: new Date() },
      );
      return await this.findOneById(request.id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   * Get all Users.
   *
   * @returns {User[]}
   */
  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  /**
   * Find a single user by their email.
   *
   * @param email The users email to filter by.
   * @returns {User}
   */
  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ where: { email: email } });
  }

  /**
   * Find a single user by their hardware id.
   *
   * @param hid The users hardware id to filter by.
   * @returns {User}
   */
  async findOneHid(hid: string): Promise<User | undefined> {
    return this.userModel.findOne({ where: { hid: hid } });
  }

  /**
   * Find a single user by their id.
   *
   * @param id The users id to filter by.
   * @returns {User}
   */
  async findOneById(id: string): Promise<User | undefined> {
    return this.userModel.findOne({ where: { id: id } });
  }
}
