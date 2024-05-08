//Libary
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common/decorators';
//./
import { UserService } from './user.service';
import { EmailService } from 'src/email/email.service';
//Entities
import { User } from 'src/entities/user.entity';
import { InternalServerErrorException } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
  ) {}

  //Ex: http://localhost:5000/user - GET
  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  //Ex: http://localhost:5000/user/login - POST
  @Post('login')
  async loginUser(
    @Body() userData: { email: string; password: string },
  ): Promise<User | null> {
    return this.userService.findUser(userData.email, userData.password);
  }

  //Ex: http://localhost:5000/user/forgot-password - Post
  @Post('forgot-password')
  async forgotPassword(
    @Body('email') email: string,
  ): Promise<{ message: string }> {
    try {
      // Gọi service quên mật khẩu
      await this.userService.forgotPassword(email);

      return { message: 'Password reset link sent to your email.' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to reset password');
    }
  }
  //Ex: http://localhost:5000/user/reset-password - Post
  @Post('reset-password')
  async resetPassword(
    @Body() data: { token: string; newPassword: string },
  ): Promise<void> {
    const { token, newPassword } = data;
    // Xác định người dùng dựa trên token
    const user = await this.userService.findUserByResetToken(token);
    if (!user) {
      // Xử lý token không hợp lệ
      throw new Error('Invalid or expired token');
    }

    // Cập nhật mật khẩu mới cho người dùng
    await this.userService.updatePassword(user._id, newPassword);
  }

  //Ex: http://localhost:5000/user - POST
  @Post()
  async create(@Body() data: any): Promise<any> {
    return this.userService.create(data);
  }

  //Ex: http://localhost:5000/user/${id} - Put
  @Put(':id')
  async updatetattoocare(
    @Param('id') id: string,
    @Body() data: any,
  ): Promise<any> {
    return this.userService.update(id, data);
  }

  //Ex: http://localhost:5000/user/${id} - Delete
  @Delete(':id')
  async deletetattoocare(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
