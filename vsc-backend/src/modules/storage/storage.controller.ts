import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { StorageService } from './storage.service';
import { Response } from 'express';
import { PricingPackagesService } from '../pricingPackages/pricingPackages.service';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApplicationsService } from '../applications/applications.service';

@Controller('storage')
@ApiTags('Storage')
export class StorageController {
  constructor(
    private readonly storageService: StorageService,
    private pricingPackageService: PricingPackagesService,
    private subscriptionService: SubscriptionsService,
    private applicationService: ApplicationsService,
  ) {}

  @Get('/download/:packageId/:userId')
  async serveFile(
    @Param('packageId') packageId: string,
    @Param('userId') userId: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      let bucketName;
      let filePath;
      let applicationName;
      if (userId == 'website') {
        const app = await this.applicationService.findOneById(packageId);
        bucketName = app.bucket;
        filePath = app.path;
        applicationName = app.applicationName;
      } else {
        const subscription =
          await this.subscriptionService.findActiveSubscriptionByUserId(userId);

        if (subscription.pricingPackageId == packageId) {
          const pp =
            await this.pricingPackageService.findOneByPricingPackageIdWithFile(
              packageId,
            );
          bucketName = pp.application.bucket;
          filePath = pp.application.path;
          applicationName = pp.application.applicationName;
        } else {
          throw new UnauthorizedException('You are not subscribed');
        }
      }

      // Get a reference to the file
      const file = this.storageService
        .getStorage()
        .bucket(bucketName)
        .file(filePath);

      // Check if the file exists in Google Cloud Storage
      const [exists] = await file.exists();

      if (!exists) {
        throw new NotFoundException('File not found in gcs');
      }

      // Set response headers for file download
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${applicationName}.zip"`,
      );
      res.setHeader('Content-Type', 'application/zip');

      // Stream the file to the response
      file
        .createReadStream()
        .on('error', (err) => {
          throw err;
        })
        .pipe(res);
    } catch (error) {
      console.log(error);
      throw new NotFoundException('File not found');
    }
  }

  @ApiResponse({
    status: 200,
  })
  @Get('/presigned/:type/:fileName')
  async getPresignedUrl(
    @Param('type') type: string,
    @Param('fileName') fileName: string,
  ) {
    try {
      const options = {
        version: 'v4',
        action: 'write',
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
        method: 'POST',
        // contentType: 'application/zip',
      };
      const bucketName = 'vstreamasiabucket';

      const [url] = await this.storageService
        .getStorage()
        .bucket(bucketName)
        .file(`${type == 'app' ? 'applications' : 'resources'}/${fileName}`)
        .getSignedUrl(options);

      return { url: url };
    } catch (error) {
      throw new NotFoundException('File not found');
    }
  }

  @ApiResponse({
    status: 201,
  })
  @Post('/upload/:type/:fileName')
  @UseInterceptors(FileInterceptor('file'))
  async uploadApplication(
    @Param('type') type: string,
    @Param('fileName') fileName: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const bucketName = 'vstreamasiabucket';
      const bucket = this.storageService.getStorage().bucket(bucketName); // Replace with your GCS bucket name
      const blob = bucket.file(
        `${type == 'app' ? 'applications' : 'resources'}/${fileName}`,
      );

      // Create a writable stream and upload the file to GCS
      const stream = blob.createWriteStream({
        resumable: false,
        metadata: {
          contentType: file.mimetype,
        },
      });

      stream.end(file.buffer);

      return {
        url: `${bucketName}/${
          type == 'app' ? 'applications' : 'resources'
        }/${fileName}`,
      };
    } catch (error) {
      throw new NotFoundException('File not found');
    }
  }
}
