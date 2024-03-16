import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist } from 'src/entities/artist.entity';

@Injectable()
export class ArtistRepository {
  constructor(@InjectModel(Artist.name) private ArtistModel: Model<Artist>) {}

  async findAll(): Promise<Artist[]> {
    return this.ArtistModel.find().exec();
  }

  async createArtist(data: Artist): Promise<Artist> {
    const newEmmloyee = new this.ArtistModel(data);
    return newEmmloyee.save();
  }

  async findById(id: string): Promise<Artist> {
    return this.ArtistModel.findById(id).exec();
  }

  async updateArtist(id: string, data: Artist): Promise<Artist> {
    const Artist = await this.ArtistModel.findById(id);

    if (!Artist) {
      return null;
    }

    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined) {
        Artist[key] = data[key];
      }
    });

    const updatedArtist = await Artist.save();
    return updatedArtist;
  }

  async removeArtist(id: string): Promise<boolean> {
    const Artist = await this.ArtistModel.findById(id);
    if (!Artist) return false;
    const result = await this.ArtistModel.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }
}
