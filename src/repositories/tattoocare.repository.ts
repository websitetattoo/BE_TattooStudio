//Libary
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//Entities
import { Tattoocare } from 'src/entities/tattoocare.entity';

@Injectable()
export class TattoocareRepository {
  constructor(
    @InjectModel(Tattoocare.name) private TattoocareModel: Model<Tattoocare>,
  ) {}

  async findAll(query: any): Promise<{ data: Tattoocare[]; total: number }> {
    const { filter, limit, sort, projection, population } = query;

    const page = query.page;
    const offset = (page - 1) * limit;
    delete filter.page;

    const total = await this.TattoocareModel.countDocuments(filter);
    const data = await this.TattoocareModel.find(filter)
      .skip(offset)
      .limit(limit)
      .sort(sort)
      .select(projection)
      .populate(population)
      .exec();

    return { data, total };
  }

  async findById(id: string): Promise<Tattoocare> {
    return this.TattoocareModel.findById(id).exec();
  }

  async createTattoocare(data: Tattoocare): Promise<Tattoocare> {
    const newEmployee = new this.TattoocareModel(data);
    return newEmployee.save();
  }

  async updateTattoocare(id: string, data: Tattoocare): Promise<Tattoocare> {
    // Kiểm tra xem Tattoocare có tồn tại không
    const existingTattoocare = await this.findById(id);
    if (!existingTattoocare) {
      throw new NotFoundException(`Tattoocare with ID ${id} not found.`);
    }

    // Cập nhật dữ liệu của Tattoocare
    const updatedTattoocare = await this.TattoocareModel.findByIdAndUpdate(
      id,
      data,
      { new: true },
    ).exec();

    return updatedTattoocare;
  }

  async removeTattoocare(id: string): Promise<void> {
    await this.TattoocareModel.findByIdAndDelete(id).exec();
  }
}
