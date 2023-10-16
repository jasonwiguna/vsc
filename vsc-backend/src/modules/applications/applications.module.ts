import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from '../entities/application.schema';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
@Module({
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
  exports: [ApplicationsService],
  imports: [TypeOrmModule.forFeature([Application])],
})
export class ApplicationsModule {}
