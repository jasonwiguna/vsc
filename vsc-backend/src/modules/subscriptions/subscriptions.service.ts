import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/modules/entities/user.schema';
import { CreateSubscriptionDto } from './dto/createSubscription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IsNull,
  LessThanOrEqual,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
import { Subscription } from '../entities/subscription.schema';
import { EnterLicenseKeyDto } from '../users/dto/enterLicenseKey.dto';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionModel: Repository<Subscription>,
    @InjectRepository(User) private userModel: Repository<User>,
  ) {}

  async create(
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    try {
      return await this.subscriptionModel.save(createSubscriptionDto);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   * Get all Subscriptions.
   *
   * @returns {Subscription[]}
   */
  async findAll(): Promise<Subscription[]> {
    return this.subscriptionModel.find({
      relations: ['user', 'pricingPackage'],
    });
  }

  /**
   * Get all Subscriptions.
   *
   * @returns {Subscription[]}
   */
  async findAllActive(): Promise<Subscription[]> {
    return this.subscriptionModel.find({
      where: {
        suspended: false,
        subscriptionDate: LessThanOrEqual(new Date()),
        expirationDate: MoreThanOrEqual(new Date()),
        user: { hid: Not(IsNull()) },
      },
      relations: ['user', 'pricingPackage'],
    });
  }

  /**
   * Find a single subscription by user id.
   *
   * @param userId The user id to filter by.
   * @returns {Subscription}
   */
  async findOneByUserId(userId: string): Promise<Subscription | undefined> {
    return this.subscriptionModel.findOne({ where: { userId: userId } });
  }

  /**
   * Find a single subscription by subscription id.
   *
   * @param subscriptionId The subscription id to filter by.
   * @returns {Subscription}
   */
  async findOneBySubscriptionId(
    subscriptionId: string,
  ): Promise<Subscription | undefined> {
    return this.subscriptionModel.findOne({
      where: { id: subscriptionId },
    });
  }

  /**
   * Find a single subscription by user email and license key.
   *
   * @param email The users email to filter by.
   * @param key The subscription key to filter by.
   * @returns {Subscription}
   */
  async findSubscriptionByLicenseKey(
    request: EnterLicenseKeyDto,
  ): Promise<Subscription | undefined> {
    const user = await this.userModel.findOne({
      where: { email: request.email },
    });
    return this.subscriptionModel.findOne({
      where: {
        userId: user.id,
        key: request.key.replace('-', '').toLowerCase(),
      },
    });
  }

  /**
   * Find a single subscription by user email and license key.
   *
   * @param email The users email to filter by.
   * @param key The subscription key to filter by.
   * @returns {Subscription}
   */
  async findActiveSubscriptionByLicenseKey(
    request: EnterLicenseKeyDto,
  ): Promise<Subscription | undefined> {
    const user = await this.userModel.findOne({
      where: { email: request.email },
    });
    if (user) {
      return this.subscriptionModel.findOne({
        where: {
          userId: user.id,
          key: request.key.replace('-', '').toLowerCase(),
          subscriptionDate: LessThanOrEqual(new Date()),
          expirationDate: MoreThanOrEqual(new Date()),
        },
      });
    } else {
      throw new BadRequestException(
        {
          success: false,
          response: { success: false, message: 'User does not exist' },
        },
        'Bad request',
      );
    }
  }
}
