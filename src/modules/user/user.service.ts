//Libary
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common/decorators';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
//Repositories
import { UserRepository } from 'src/repositories/User.repository';
import { EmailService } from 'src/email/email.service';
//Entities
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findUser(email, password);
    if (!user) {
      throw new NotFoundException('Invalid email or password');
    }
    return user;
  }

  async create(data: any): Promise<User> {
    try {
      const { password, ...userWithoutPassword } = data;

      // Mã hóa mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10);

      // Tạo user với mật khẩu đã được mã hóa
      const userWithHashedPassword = {
        ...userWithoutPassword,
        password: hashedPassword,
      };

      // Gọi repository để tạo user đã được mã hóa mk
      return this.userRepository.create(userWithHashedPassword);
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: any): Promise<User> {
    try {
      const { password, ...userWithoutPassword } = data;

      let hashedPassword: string;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      // Tạo user mới với những dữ liệu đã được update
      const updatedUser = {
        ...userWithoutPassword,
        password: hashedPassword || undefined,
      };

      // Gọi repository để update user vào db
      return this.userRepository.update(id, updatedUser);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.remove(id);
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const resetToken = uuidv4(); // Hàm mã hóa tự động generate token ngẫu nhiên
      // Lấy resetToken lưu trữ để so sánh với resetToken khi gọi link reset password
      user.resetToken = resetToken; // Cập nhật field "resetToken" vào user

      await user.save();
      // Gửi link reset password tới người dùng
      await this.emailService.sendMailUserResetPassword(email, resetToken);
    } catch (error) {
      console.error('Error resetting password:', error);
      throw new InternalServerErrorException('Failed to reset password');
    }
  }
  async findUserByResetToken(token: string): Promise<User | null> {
    // Truy vấn cơ sở dữ liệu để tìm người dùng dựa trên token
    return await this.userRepository.findUserByResetToken(token);
  }
  async updatePassword(id: string, newPassword: string): Promise<void> {
    return await this.userRepository.updatePassword(id, newPassword);
  }
}
