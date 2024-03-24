//Libary
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//Entities
import { Faq } from 'src/entities/Faq.entity';

@Injectable()
export class FaqRepository {
  constructor(@InjectModel(Faq.name) private FaqModel: Model<Faq>) {}
  async findAll(): Promise<Faq[]> {
    return this.FaqModel.find().exec();
  }

  async create(data: any): Promise<Faq> {
    const newFaq = new this.FaqModel(data);
    return newFaq.save();
  }
  async findById(id: string): Promise<Faq> {
    return this.FaqModel.findById(id).exec();
  }

  async update(id: string, data: Faq): Promise<Faq> {
    const Faq = await this.FaqModel.findById(id);

    if (!Faq) {
      return null;
    }

    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined) {
        Faq[key] = data[key];
      }
    });

    const updatedFaq = await Faq.save();
    return updatedFaq;
  }

  async remove(id: string): Promise<{ status: number; message: string }> {
    try {
      const Faq = await this.FaqModel.findById(id);
      if (!Faq) {
        return { status: 404, message: 'Faq not found' };
      }

      const result = await this.FaqModel.deleteOne({ _id: id });
      if (result.deletedCount > 0) {
        return { status: 204, message: 'Faq deleted successfully' };
      } else {
        return { status: 500, message: 'Failed to delete Faq' };
      }
    } catch (error) {
      throw error;
    }
  }
}
