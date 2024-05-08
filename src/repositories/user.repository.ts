import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  }

  async create(userData: any): Promise<User> {
    try {
      const newUser = new this.userModel(userData);
      return await newUser.save();
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }

  async update(id: string, data: User): Promise<User | null> {
    try {
      const updatedUser = await this.userModel
        .findByIdAndUpdate(id, data, { new: true })
        .exec();
      return updatedUser;
    } catch (error) {
      throw new Error('Failed to update user');
    }
  }

  async remove(id: string): Promise<{ status: number; message: string }> {
    try {
      const result = await this.userModel.deleteOne({ _id: id });
      if (result.deletedCount > 0) {
        return { status: 204, message: 'User deleted successfully' };
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  }

  async findUser(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({ email }).exec();

      if (!user) {
        return null;
      }

      // Kiểm tra password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return null;
      }

      return user;
    } catch (error) {
      throw new Error('Failed to find user');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findUserByResetToken(token: string): Promise<User | null> {
    // Truy vấn cơ sở dữ liệu để tìm người dùng dựa trên token
    return await this.userModel.findOne({ resetToken: token });
  }
  async updatePassword(id: string, newPassword: string): Promise<void> {
    // Tìm user theo id
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new Error('User not found');
    }
    // Mã hóa mật khẩu và lưu vào db
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();
  }
}
