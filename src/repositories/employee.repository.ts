import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Employee } from "src/entities/employee.entity";


@Injectable() 

export class EmployeeRepository {
    constructor(
        @InjectModel(Employee.name) private EmployeeModel: Model<Employee>) {}
        
        
}