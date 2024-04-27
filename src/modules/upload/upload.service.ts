import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Dropbox, Error, files } from 'dropbox';

@Injectable()
export class UploadService {
  dropbox: Dropbox;
  constructor(private configService: ConfigService) {
    this.dropbox = new Dropbox({
      clientId: this.configService.get('file.apiKey'),
      clientSecret: this.configService.get('file.apiSecret'),
      accessToken: this.configService.get('file.accessToken'),
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      const timestamp = Date.now().toString();

      const path = `/${timestamp}-${file.originalname}`;
      // Upload file to Dropbox
      await this.dropbox.filesUpload({
        path,
        contents: file.buffer,
        mode: { '.tag': 'overwrite' }, // To handle overwriting or add unique naming logic
      });

      // Create a shared link
      const linkResponse =
        await this.dropbox.sharingCreateSharedLinkWithSettings({
          path,
        });

      // Replace www with dl to make the link a direct download link
      return linkResponse.result.url.replace('www', 'dl');
    } catch (error) {
      console.error(
        'Failed to upload or share file:',
        file.originalname,
        error,
      );
      throw error; // Re-throw to handle the error further up the chain
    }
  }

  async uploadFiles(files: Array<Express.Multer.File>): Promise<string[]> {
    if (files.length === 1) {
      // Use the same function for single file uploads for consistency
      return [await this.uploadFile(files[0])];
    }

    // Map each file to the upload and share function and handle them concurrently
    const uploadPromises = files.map((file) => this.uploadFile(file));
    const results = await Promise.allSettled(uploadPromises);

    // Process results to filter out successful uploads and handle errors
    return results
      .map((result) => {
        if (result.status === 'fulfilled') {
          return result.value;
        } else {
          console.error('Error processing file:', result.reason);
          return null; // or handle differently as needed
        }
      })
      .filter((url) => url !== null); // Filter out any nulls due to errors
  }
}
