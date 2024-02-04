import { Body, Controller, Get, Post, UploadedFiles } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from 'src/entities/employee.entity';

@Controller('employees')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  //API lấy tất cả nhân viên trong danh sách
  //Ex: http://localhost:3000/employees - GET
  @Get()
  async getAllEmployees(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  //API lưu thông tin nhân viên vào db
  //Ex: http://localhost:3000/employees - POST
  @Post('/createEmployee')
  async createEmployee(
    @Body() data: any,
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File;
      images?: Express.Multer.File[];
    },
  ): Promise<any> {
    return this.employeeService.create(data, files);
  }
}
