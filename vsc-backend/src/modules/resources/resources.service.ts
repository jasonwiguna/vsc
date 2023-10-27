import { Injectable } from '@nestjs/common';
import { CreateResourceDto } from './dto/createResource.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EditResourceDto } from './dto/editResource.dto';
import { DeleteResourceDto } from './dto/deleteResource.dto';
import { Resource } from '../entities/resource.schema';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private resourceModel: Repository<Resource>,
  ) {}

  async create(createResourceDto: CreateResourceDto): Promise<Resource> {
    try {
      const filename = `${createResourceDto.filenameWithoutExtension}.${createResourceDto.fileExtension}`;
      return await this.resourceModel.save({
        resourceName: createResourceDto.resourceName,
        bucket: 'vstreamasiabucket',
        path: `resources/${filename}`,
        filename: filename,
        priority: createResourceDto.priority,
        applicationId: createResourceDto.applicationId,
        section: createResourceDto.section,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async edit(editResourceDto: EditResourceDto): Promise<Resource> {
    try {
      await this.resourceModel.update(
        {
          id: editResourceDto.id,
        },
        editResourceDto,
      );
      return await this.resourceModel.findOne({
        where: { id: editResourceDto.id },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async delete(deleteResourceDto: DeleteResourceDto) {
    try {
      return await this.resourceModel.delete({
        id: deleteResourceDto.id,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   * Find a single resource by id.
   *
   * @param resourceId The resource id to filter by.
   * @returns {Resource}
   */
  async findOneByResourceId(resourceId: string): Promise<Resource | undefined> {
    return this.resourceModel.findOne({
      where: { id: resourceId },
    });
  }

  /**
   * Find a single resource by id.
   *
   * @param resourceId The resource id to filter by.
   * @returns {Resource}
   */
  async findOneByResourceIdWithFile(
    resourceId: string,
  ): Promise<Resource | undefined> {
    return this.resourceModel.findOne({
      relations: ['application'],
      where: { id: resourceId },
    });
  }

  /**
   * Get all Resource.
   *
   * @returns {Resource[]}
   */
  async findAll(): Promise<Resource[]> {
    return this.resourceModel.find({
      order: { priority: 'ASC' },
    });
  }

  /**
   * Get all Resource with App Info.
   *
   * @returns {Resource[]}
   */
  async findAllWithInfo(): Promise<Resource[]> {
    return this.resourceModel.find({
      relations: ['application'],
      order: { section: 'ASC', priority: 'ASC' },
    });
  }
}
