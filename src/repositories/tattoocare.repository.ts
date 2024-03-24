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

  async findAll(): Promise<Tattoocare[]> {
    return this.TattoocareModel.find().exec();
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
