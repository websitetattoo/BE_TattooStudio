import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Discount, DiscountSchema } from "src/entities/discount.entity";
import { DiscountRepository } from "src/repositories/discount.repository";



@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Discount.name,
                schema: DiscountSchema,
            }
        ])
    ],
    providers: [DiscountRepository]
})


export default class DiscountModule {}