//Libary
import { Injectable } from '@nestjs/common/decorators';
//Cloudinary
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
//Repositories
import { UserRepository } from 'src/repositories/User.repository';
//Entities
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async create(userData: any, files: any): Promise<User> {
    //Lặp qua mảng ảnh và tải lên cloudinary
    const uploadPromises = files.map((file: any) => {
      return this.cloudinaryService.uploadImage(file);
    });

    const uploadResults = await Promise.all(uploadPromises);
    // Trích xuất URL của hình ảnh được tải lên
    const rfImageUrl: string = uploadResults[0].secure_url;
    const lcImageUrl: string = uploadResults[1].secure_url;
    const addImageUrl: string = uploadResults[2].secure_url;

    // Tạo đối tượng người dùng
    const user: User = {
      ...userData,
      rfImage: rfImageUrl,
      lcImage: lcImageUrl,
      addImage: addImageUrl,
    };
    return this.userRepository.create(user);
  }
}
