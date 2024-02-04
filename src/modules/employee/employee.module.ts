import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from 'src/entities/employee.entity';
import { EmployeeRepository } from 'src/repositories/employee.repository';
import { EmployeeService } from './employee.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { EmployeeController } from './employee.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Employee.name,
        schema: EmployeeSchema,
      },
    ]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeRepository, EmployeeService, CloudinaryService],
  exports: [EmployeeService, EmployeeRepository],
})
export default class EmployeeModule {}
