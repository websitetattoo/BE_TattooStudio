//Libary
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//Entities
import { Artist } from 'src/entities/artist.entity';

@Injectable()
export class ArtistRepository {
  constructor(@InjectModel(Artist.name) private ArtistModel: Model<Artist>) {}

  async findAll(query: any): Promise<{ data: Artist[]; total: number }> {
    const { filter, limit, sort, projection, population } = query;

    const page = query.page;
    const offset = (page - 1) * limit;
    delete filter.page;

    const total = await this.ArtistModel.countDocuments(filter);
    const data = await this.ArtistModel.find(filter)
      .skip(offset)
      .limit(limit)
      .sort(sort)
      .select(projection)
      .populate(population)
      .exec();

    return { data, total };
  }

  async create(data: Artist): Promise<Artist> {
    const newEmmloyee = new this.ArtistModel(data);
    return newEmmloyee.save();
  }

  async findById(id: string): Promise<Artist> {
    return this.ArtistModel.findById(id).exec();
  }

  async update(id: string, data: Artist): Promise<Artist> {
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

  async remove(id: string): Promise<boolean> {
    const Artist = await this.ArtistModel.findById(id);
    if (!Artist) return false;
    const result = await this.ArtistModel.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }
}
