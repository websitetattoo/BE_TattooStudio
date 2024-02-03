import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from 'src/entities/employee.entity';
import { EmployeeRepository } from 'src/repositories/employee.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Employee.name,
        schema: EmployeeSchema,
      },
    ]),
  ],
  providers: [EmployeeRepository],
})
export default class EmployeeModule {}
