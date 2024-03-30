//Libary
import { Injectable } from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//Entities
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async create(userData: any): Promise<User> {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  async update(id: string, data: User): Promise<User> {
    // Cập nhật dữ liệu của User
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();

    return updatedUser;
  }

  async remove(id: string): Promise<{ status: number; message: string }> {
    try {
      const result = await this.userModel.deleteOne({ _id: id });
      if (result.deletedCount > 0) {
        return { status: 204, message: 'User deleted successfully' };
      } else {
        return { status: 500, message: 'Failed to delete User' };
      }
    } catch (error) {
      throw error;
    }
  }
}
