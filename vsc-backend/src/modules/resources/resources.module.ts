import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';
import { Resource } from '../entities/resource.schema';
@Module({
  controllers: [ResourcesController],
  providers: [ResourcesService],
  exports: [ResourcesService],
  imports: [TypeOrmModule.forFeature([Resource])],
})
export class ResourcesModule {}
