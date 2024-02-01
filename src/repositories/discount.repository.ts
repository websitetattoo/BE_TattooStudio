import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Discount } from "src/entities/discount.entity";


@Injectable() 

export class DiscountRepository {
    constructor(
        @InjectModel(Discount.name) private DiscountModel: Model<Discount>) {}
        
        
}