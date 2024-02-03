//Libary
import { Module } from '@nestjs/common/decorators';
import { MongooseModule } from '@nestjs/mongoose';
//Repositories
import { UserRepository } from 'src/repositories/User.repository';
//./
import { UserController } from './user.controller';
import { UserService } from './user.service';
//Entities
import { User, UserSchema } from 'src/entities/User.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserRepository, UserService, CloudinaryService],
})
export default class UserModule {}
