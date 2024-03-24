//Libary
import { Injectable } from '@nestjs/common/decorators';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  //Hàm upload ảnh lên cloud
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }

  async deleteImage(imageUrl: string): Promise<void> {
    try {
      // Lấy public_id từ đường dẫn ảnh
      const publicId = this.getPublicId(imageUrl);
      // Thực hiện yêu cầu xoá ảnh
      await v2.uploader.destroy(publicId);
    } catch (error) {
      throw new Error(`Failed to delete image: ${error.message}`);
    }
  }

  private getPublicId(imageUrl: string): string {
    // Ví dụ: chuyển đổi đường dẫn "https://res.cloudinary.com/demo/image/upload/v1625670334/sample.jpg" thành "sample.jpg"
    const startIndex = imageUrl.lastIndexOf('/') + 1;
    const endIndex = imageUrl.lastIndexOf('.');
    return imageUrl.substring(startIndex, endIndex);
  }
}
