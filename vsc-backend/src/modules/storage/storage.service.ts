import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';

/**
 * This service would probably download files from a file storage
 * like S3, minio etc.
 */
@Injectable()
export class StorageService {
  private readonly storage;

  constructor() {
    // create connection to your file storage
    this.storage = new Storage({
      keyFilename: process.env.KEY_FILENAME, // Provide the path to your service account key
      projectId: process.env.PROJECT_ID, // Replace with your GCP project ID
    });
  }

  getStorage() {
    return this.storage;
  }
}
