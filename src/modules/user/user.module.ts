import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/entities/User.entity";
import { UserRepository } from "src/repositories/User.repository";



@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            }
        ])
    ],
    providers: [UserRepository]
})


export default class UserModule {}