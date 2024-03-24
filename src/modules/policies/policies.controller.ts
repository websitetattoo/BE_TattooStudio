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

  //Ex: http://localhost:3000/policiess - GET
  @Get()
  async getAllPolicies(): Promise<Policies[]> {
    return this.policiesService.findAll();
  }

  // Lấy một policies cụ thể
  @Get(':id')
  async getPoliciesById(@Param('id') id: string): Promise<Policies> {
    return this.policiesService.findById(id);
  }

  //Ex: http://localhost:3000/policies - POST
  @Post('/createPolicies')
  async createPolicies(@Body() data: any): Promise<any> {
    return this.policiesService.create(data);
  }

  // Cập nhật policies
  @Put(':id')
  async updatePolicies(
    @Param('id') id: string,
    @Body() data: any,
  ): Promise<Policies> {
    return this.policiesService.updatePolicy(id, data);
  }

  // Xóa policies
  @Delete(':id')
  async deletePolicies(@Param('id') id: string): Promise<void> {
    return this.policiesService.removePolicy(id);
  }
}
