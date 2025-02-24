import { Injectable, NotFoundException } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Artist } from 'src/entities/artist.entity';
import { ArtistRepository } from 'src/repositories/Artist.repository';

@Injectable()
export class ArtistService {
  constructor(
    private ArtistRepository: ArtistRepository,
    private cloudinaryService: CloudinaryService,
  ) {}

  async findAll(query: any = {}): Promise<{ data: Artist[]; total: number }> {
    return this.ArtistRepository.findAll(query);
  }

  async create(data: any, files: any): Promise<Artist> {
    try {
      const uploadImages = files.map((file: any) => {
        return this.cloudinaryService.uploadImage(file);
      });
      const uploadResult = await Promise.all(uploadImages);

      //Tạo đối tượng ảnh với id, url
      const newImages = uploadResult.slice(1).map((image) => ({
        url: image.secure_url,
      }));
      const newArtist: Artist = {
        ...data,
        avatar: uploadResult[0]?.secure_url,
        images: newImages,
      };
      const createArtist = await this.ArtistRepository.create(newArtist);

      return createArtist;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<Artist> {
    const Artist = await this.ArtistRepository.findById(id);
    if (!Artist) {
      throw new NotFoundException(`Artist with ID ${id} not found.`);
    }
    return Artist;
  }

  async update(id: string, data: any, files: any): Promise<Artist> {
    try {
      // Truy vấn Artist cũ để lấy đường dẫn ảnh cũ từ db
      const oldArtist = await this.ArtistRepository.findById(id);
      if (!oldArtist) {
        throw new Error('Image Artist not found');
      }
      const { avatar, images, ...other } = data;

      //Tạo đối tượng ảnh với id, url
      const newImages = images.map((item) => ({
        url: item,
      }));

      let newData: Artist = { ...other, images: newImages };
      //Nếu có update ảnh
      if (!avatar.url) {
        if (oldArtist.avatar) {
          // Xoá ảnh đại diện trên cloudinary
          await this.cloudinaryService.deleteImage(oldArtist.avatar);
        }
        //Upload ảnh đại diện
        const uploadImages = files.map((file: any) => {
          return this.cloudinaryService.uploadImage(file);
        });
        const uploadResult = await Promise.all(uploadImages);

        newData = {
          ...other,
          avatar: uploadResult[0]?.secure_url,
          images: newImages,
        };
      }

      return await this.ArtistRepository.update(id, newData);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    const oldArtist = await this.ArtistRepository.findById(id);
    if (!oldArtist) {
      throw new Error('Image Artist not found');
    }

    // Xoá ảnh trên Cloudinary khi Artist bị xoá
    if (oldArtist.avatar) {
      await this.cloudinaryService.deleteImage(oldArtist.avatar);
    }
    //Xoá các ảnh kèm theo trên Cloudinary
    if (Array.isArray(oldArtist.images) && oldArtist.images.length > 0) {
      for (const image of oldArtist.images) {
        await this.cloudinaryService.deleteImage(image.url);
      }
    }
    await this.ArtistRepository.remove(id);
  }
}
