//Libary
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
//./
import { PoliciesService } from './policies.service';
//Entities
import { Policies } from 'src/entities/policies.entity';

@Controller('policies')
export class PoliciesController {
  constructor(private policiesService: PoliciesService) {}

  //API lấy tất cả nhân viên trong danh sách
  //Ex: http://localhost:3001/policiess - GET
  @Get()
  async getAllPolicies(): Promise<Policies[]> {
    return this.policiesService.findAll();
  }

  // Lấy một chính sách cụ thể theo ID
  @Get(':id')
  async getPoliciesById(@Param('id') id: string): Promise<Policies> {
    return this.policiesService.findById(id);
  }

  //API lưu thông tin nhân viên vào db
  //Ex: http://localhost:3001/policies - POST
  @Post('/createPolicies')
  async createPolicies(@Body() data: any): Promise<any> {
    return this.policiesService.create(data);
  }

  // Cập nhật chính sách
  @Put(':id')
  async updatePolicies(
    @Param('id') id: string,
    @Body() data: any,
  ): Promise<Policies> {
    return this.policiesService.updatePolicy(id, data);
  }

  // Xóa chính sách
  @Delete(':id')
  async deletePolicies(@Param('id') id: string): Promise<void> {
    return this.policiesService.removePolicy(id);
  }
}
