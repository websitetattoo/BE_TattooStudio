//Libary
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//Entities
import { Images } from 'src/entities/images.entity';

@Injectable()
export class ImagesRepository {
  constructor(@InjectModel(Images.name) private ImagesModel: Model<Images>) {}

  async update(id: string, data: Images): Promise<Images> {
    const Images = await this.ImagesModel.findById(id);

    if (!Images) {
      return null;
    }

    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined) {
        Images[key] = data[key];
      }
    });

    const updatedImages = await Images.save();
    return updatedImages;
  }

  async findById(id: string): Promise<Images> {
    return this.ImagesModel.findById(id).exec();
  }
}
