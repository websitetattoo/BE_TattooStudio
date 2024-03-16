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

  async findAll(): Promise<Artist[]> {
    return this.ArtistRepository.findAll();
  }

  async create(data: any, files: any): Promise<Artist> {
    try {
      const uploadImages = files.map((file: any) => {
        return this.cloudinaryService.uploadImage(file);
      });
      const uploadResult = await Promise.all(uploadImages);

      const newArtist: Artist = {
        ...data,
        avatar: uploadResult[0]?.secure_url,
        images: uploadResult.slice(1).map((image) => image.secure_url),
      };
      const createArtist = await this.ArtistRepository.createArtist(newArtist);

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

  async updateArtist(id: string, data: Artist): Promise<Artist> {
    return await this.ArtistRepository.updateArtist(id, data);
  }

  async removeArtist(id: string): Promise<void> {
    await this.ArtistRepository.removeArtist(id);
  }
}
