import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from 'src/entities/employee.entity';

@Injectable()
export class EmployeeRepository {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
  ) {}

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  async createEmployee(data: Employee): Promise<Employee> {
    const newEmmloyee = new this.employeeModel(data);
    return newEmmloyee.save();
  }

  async getEmployee(id: number): Promise<Employee> {
    const employee = await this.employeeModel.findById(id);
    return employee;
  }

  async updateEmployee(id: string, data: Employee): Promise<Employee> {
    const employee = await this.employeeModel.findById(id);

    if (!employee) {
      return null; // Employee not found
    }

    // Update the employee properties
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined) {
        employee[key] = data[key];
      }
    });
    // Save the updated employee
    const updatedEmployee = await employee.save();
    return updatedEmployee;
  }

  async deleteEmployee(id: string): Promise<boolean> {
    const employee = await this.employeeModel.findById(id);
    if (!employee) return false;
    const result = await this.employeeModel.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }
}
