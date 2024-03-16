//Libary
import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
} from '@nestjs/common/decorators';
//./
import { UserService } from './user.service';
//Entities
import { User } from 'src/entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //API lấy tất cả danh sách khách hàng
  //Ex: http://localhost:3000/users - GET
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  //API lưu thông tin khách hàng đặt lịch
  //Ex: http://localhost:3000/users - POST
  @Post()
  async createUser(
    @Body() userData: any,
    @UploadedFiles()
    files: {
      rfImage?: Express.Multer.File[];
      lcImage?: Express.Multer.File[];
      addImage?: Express.Multer.File[];
    },
  ): Promise<any> {
    return this.userService.create(userData, files);
  }
}
