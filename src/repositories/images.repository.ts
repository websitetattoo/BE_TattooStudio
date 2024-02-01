import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Images } from "src/entities/images.entity";


@Injectable() 

export class ImagesRepository {
    constructor(
        @InjectModel(Images.name) private ImagesModel: Model<Images>) {}
        
        
}