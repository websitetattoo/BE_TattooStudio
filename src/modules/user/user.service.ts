//Libary
import { Injectable } from '@nestjs/common/decorators';
//Repositories
import { UserRepository } from 'src/repositories/User.repository';
//Entities
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async create(data: any): Promise<User> {
    try {
      const newUser: User = {
        ...data,
      };
      const createUser = await this.userRepository.create(newUser);

      return createUser;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: User): Promise<User> {
    return await this.userRepository.update(id, data);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.remove(id);
  }
}
