//Libary
import { Injectable } from '@nestjs/common/decorators';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import Jimp from 'jimp';

@Injectable()
export class CloudinaryService {
  //Hàm upload ảnh lên cloud
  async uploadImageToCloudinary(
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

  //Hàm upload ảnh lên cloud(nén ảnh giảm chất lượng ảnh)
  async uploadImageV2(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    try {
      // Đọc ảnh từ buffer
      const image = await Jimp.read(file.buffer);

      // Resize ảnh với chiều rộng tối đa là 800px (cao tự động tính toán theo tỷ lệ)
      image.resize(600, Jimp.AUTO);

      // Nén ảnh với chất lượng JPEG là 100
      image.quality(100);

      // Chuyển đổi ảnh sang buffer
      const compressedImageBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);

      // Upload ảnh nén lên Cloudinary
      const uploadResult = await this.uploadImageToCloudinary({
        ...file,
        buffer: compressedImageBuffer,
      });

      return uploadResult;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
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
