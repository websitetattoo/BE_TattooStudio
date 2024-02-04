import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Employee } from 'src/entities/employee.entity';
import { EmployeeRepository } from 'src/repositories/employee.repository';

@Injectable()
export class EmployeeService {
  constructor(
    private employeeRepository: EmployeeRepository,
    private cloudinaryService: CloudinaryService,
  ) {}

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.findAll();
  }

  async create(data: any, files: any): Promise<Employee> {
    try {
      const uploadImages = files.map((file: any) => {
        return this.cloudinaryService.uploadImage(file);
      });
      const uploadResult = await Promise.all(uploadImages);

      const newEmployee: Employee = {
        ...data,
        avatar: uploadResult[0]?.secure_url,
        images: uploadResult.slice(1).map((image) => image.secure_url),
      };
      const createEmployee =
        await this.employeeRepository.createEmployee(newEmployee);

      return createEmployee;
    } catch (error) {
      throw error; // Rethrow the error for handling at a higher level
    }
  }
}
