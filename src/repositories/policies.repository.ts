//Libary
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//Entities
import { Policies } from 'src/entities/policies.entity';

@Injectable()
export class PoliciesRepository {
  constructor(
    @InjectModel(Policies.name) private policiesModel: Model<Policies>,
  ) {}

  async findAll(query: any): Promise<Policies[]> {
    const { filter, limit, sort, projection, population } = query;

    const page = query.page;
    const offset = (page - 1) * limit;
    delete filter.page;

    return await this.policiesModel
      .find(filter)
      .skip(offset)
      .limit(limit)
      .sort(sort)
      .select(projection)
      .populate(population)
      .exec();
  }

  async findById(id: string): Promise<Policies> {
    return this.policiesModel.findById(id).exec();
  }

  async createPolicy(data: Policies): Promise<Policies> {
    const newEmployee = new this.policiesModel(data);
    return newEmployee.save();
  }

  async updatePolicy(id: string, data: Policies): Promise<Policies> {
    // Kiểm tra xem policy có tồn tại không
    const existingPolicy = await this.findById(id);
    if (!existingPolicy) {
      throw new NotFoundException(`Policy with ID ${id} not found.`);
    }

    // Cập nhật dữ liệu của policy
    const updatedPolicy = await this.policiesModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();

    return updatedPolicy;
  }

  async removePolicy(id: string): Promise<{ message: string }> {
    const deletedPolicy = await this.policiesModel.findByIdAndDelete(id).exec();
    if (!deletedPolicy) {
      throw new NotFoundException(`Policy with ID ${id} not found.`);
    }
    return { message: `This policy deleted successfully.` };
  }
}
