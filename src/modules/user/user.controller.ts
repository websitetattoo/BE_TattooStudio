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
//Entities
import { User } from 'src/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //Ex: http://localhost:5000/user - GET
  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.findAll();
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
