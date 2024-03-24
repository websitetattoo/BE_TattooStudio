//Libary
import { Injectable } from '@nestjs/common';
//Cloudinary
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
//Repositories
import { ArtistRepository } from 'src/repositories/Artist.repository';

@Injectable()
export class ImagesService {
  constructor(
    private cloudinaryService: CloudinaryService,
    private ArtistRepository: ArtistRepository,
  ) {}

  async updateImagesArtis(data: any, file: any): Promise<string> {
    try {
      const { parentId, id } = data;
      // Truy vấn Images cũ để lấy đường dẫn ảnh cũ từ db
      const oldArtist = await this.ArtistRepository.findById(parentId);
      if (!oldArtist) {
        throw new Error('Images Artist not found');
      }
      //Lặp qua và xoá ảnh kèm theo trc khi updated
      for (let index = 0; index < oldArtist.images.length; index++) {
        const image = oldArtist.images[index];
        if (image._id.toString() === id) {
          await this.cloudinaryService.deleteImage(image.url);
        }
      }

      //Ubload lên cloud và trả về url mới
      const uploadImages = file.map((file: any) => {
        return this.cloudinaryService.uploadImage(file);
      });
      const uploadResult = await Promise.all(uploadImages);
      const newUrl = uploadResult[0]?.secure_url;

      return newUrl;
    } catch (error) {
      throw error;
    }
  }
}
