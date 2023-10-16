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

@Controller('storage')
@ApiTags('Storage')
export class StorageController {
  constructor(
    private readonly storageService: StorageService,
    private pricingPackageService: PricingPackagesService,
    private subscriptionService: SubscriptionsService,
  ) {}

  @Get('/download/:packageId/:userId')
  async serveFile(
    @Param('packageId') packageId: string,
    @Param('userId') userId: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const subscription =
        await this.subscriptionService.findActiveSubscriptionByUserId(userId);

      if (subscription.pricingPackageId == packageId) {
        const pp =
          await this.pricingPackageService.findOneByPricingPackageIdWithFile(
            packageId,
          );
        // Define the bucket and file path where your zip files are stored
        const bucketName = pp.application.bucket;
        const filePath = pp.application.path;

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
          `attachment; filename="${pp.application.applicationName}.zip"`,
        );
        res.setHeader('Content-Type', 'application/zip');

        // Stream the file to the response
        file
          .createReadStream()
          .on('error', (err) => {
            throw err;
          })
          .pipe(res);
      } else {
        throw new UnauthorizedException('You are not subscribed');
      }
    } catch (error) {
      console.log(error);
      throw new NotFoundException('File not found');
    }
  }

  @ApiResponse({
    status: 200,
  })
  @Get('/presigned/:fileName')
  async getPresignedUrl(@Param('fileName') fileName: string) {
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
        .file(`applications/${fileName}`)
        .getSignedUrl(options);

      return { url: url };
    } catch (error) {
      throw new NotFoundException('File not found');
    }
  }

  @ApiResponse({
    status: 201,
  })
  @Post('/upload/:fileName')
  @UseInterceptors(FileInterceptor('file'))
  async uploadApplication(
    @Param('fileName') fileName: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const bucketName = 'vstreamasiabucket';
      const bucket = this.storageService.getStorage().bucket(bucketName); // Replace with your GCS bucket name
      const blob = bucket.file(`applications/${fileName}`);

      // Create a writable stream and upload the file to GCS
      const stream = blob.createWriteStream({
        resumable: false,
        metadata: {
          contentType: file.mimetype,
        },
      });

      stream.end(file.buffer);

      return { url: `${bucketName}/applications/${fileName}` };
    } catch (error) {
      throw new NotFoundException('File not found');
    }
  }
}
