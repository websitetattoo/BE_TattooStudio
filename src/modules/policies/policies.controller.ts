//Libary
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
//./
import { PoliciesService } from './policies.service';
//Entities
import { Policies } from 'src/entities/policies.entity';
import { QueryParserPipe } from 'src/query/query-parser.pipe';

@Controller('policies')
export class PoliciesController {
  constructor(private policiesService: PoliciesService) {}

  //API lấy tất cả chính sách trong db
  //Ex: http://localhost:3001/policies - GET
  @Get()
  @UsePipes(QueryParserPipe)
  async getAllPolicies(
    @Query() query?: string,
  ): Promise<{ data: Policies[]; total: number }> {
    return this.policiesService.findAll(query);
  }

  // Lấy một chính sách cụ thể theo ID
  @Get(':id')
  async getPolicyById(@Param('id') id: string): Promise<Policies> {
    return this.policiesService.findById(id);
  }

  //API lưu thông tin chính sách vào db
  //Ex: http://localhost:3001/policies - POST
  @Post()
  async createPolicy(@Body() data: any): Promise<any> {
    return this.policiesService.create(data);
  }

  // Cập nhật chính sách
  @Put(':id')
  async updatePolicy(
    @Param('id') id: string,
    @Body() data: any,
  ): Promise<Policies> {
    return this.policiesService.updatePolicy(id, data);
  }

  // Xóa chính sách
  @Delete(':id')
  async deletePolicy(@Param('id') id: string): Promise<{ message: string }> {
    return this.policiesService.removePolicy(id);
  }
}
