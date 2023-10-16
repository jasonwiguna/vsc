import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from '../entities/application.schema';
import { CreateApplicationDto } from './dto/createApplication.dto';
import { EditApplicationDto } from './dto/editApplication.dto';
import { DeleteApplicationDto } from './dto/deleteApplication.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationModel: Repository<Application>,
  ) {}

  async create(
    createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    try {
      const filename = `${createApplicationDto.filenameWithoutExtension}.${createApplicationDto.fileExtension}`;
      return await this.applicationModel.save({
        applicationName: createApplicationDto.applicationName,
        bucket: 'vstreamasiabucket',
        path: `applications/${filename}`,
        filename: filename,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async edit(editApplicationDto: EditApplicationDto): Promise<Application> {
    try {
      await this.applicationModel.update(
        {
          id: editApplicationDto.id,
        },
        editApplicationDto,
      );
      return await this.applicationModel.findOne({
        where: { id: editApplicationDto.id },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async delete(
    deleteApplicationDto: DeleteApplicationDto,
  ): Promise<Application> {
    try {
      return await this.applicationModel.findOne({
        where: { id: deleteApplicationDto.id },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   * Get all Applications.
   *
   * @returns {Application[]}
   */
  async findAll(): Promise<Application[]> {
    return this.applicationModel.find({
      order: { applicationName: 'ASC' },
    });
  }
}
