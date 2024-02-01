import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/entities/user.entity";


@Injectable() 

export class UserRepository {
    constructor(
        @InjectModel(User.name) private UserModel: Model<User>) {}
        
        
}